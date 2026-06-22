import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { inserirPet, atualizarPet } from "../repositories/petRepository";
import { BotaoPrimario } from "../components/BotaoPrimario";
import { RootStackParamList } from "../../App";
import { Pet } from "../types/pet";

type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">;

export function CadastroScreen({ navigation, route }: Props) {
  const db = useSQLiteContext();
  const idParaEditar = route.params?.idParaEditar;
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fotoUri, setFotoUri] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    if (idParaEditar) {
      carregarDadosDoPet();
    }
  }, [idParaEditar]);

  async function carregarDadosDoPet() {
    try {
      const resultado = await db.getAllAsync<Pet>(
        "SELECT * FROM pets WHERE id = ?;",
        [idParaEditar],
      );
      if (resultado.length > 0) {
        const pet = resultado[0];
        setTitulo(pet.titulo);
        setDescricao(pet.descricao);
        setFotoUri(pet.fotoUri || "");
        setLatitude(pet.latitude || 0);
        setLongitude(pet.longitude || 0);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados do animal.");
    }
  }
  async function capturarHardware() {
    const { status: camStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    if (camStatus !== "granted") {
      Alert.alert("Erro", "Precisamos de permissão para acessar a camera.");
      return;
    }

    const { status: locStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (locStatus !== "granted") {
      Alert.alert("Erro", "Precisamos de permissão para acessar o GPS.");
      return;
    }

    const foto = await ImagePicker.launchCameraAsync({ quality: 0.5 });
    if (foto.canceled) return;

    const loc = await Location.getCurrentPositionAsync({});

    setFotoUri(foto.assets[0].uri);
    setLatitude(loc.coords.latitude);
    setLongitude(loc.coords.longitude);
  }

  async function salvar() {
    if (fotoUri === "") {
      Alert.alert("Por favor, tire uma foto do animal antes de salvar.");
      return;
    }
    if (titulo.trim() === "" || descricao.trim() === "") {
      Alert.alert("Por favor, preencha o título e a descrição.");
      return;
    }
    try {
      if (idParaEditar) {
        await atualizarPet(db, idParaEditar, {
          titulo,
          descricao,
          fotoUri,
          latitude,
          longitude,
        });
        Alert.alert("Sucesso", "Informações do animal atualizadas!");
      } else {
        await inserirPet(db, {
          titulo,
          descricao,
          fotoUri,
          latitude,
          longitude,
        });
        Alert.alert("Sucesso", "Animal registado com sucesso!");
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao guardar os dados.");
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {idParaEditar ? "Editar Animal" : "Registar Novo Animal"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}> Animal / Raça / Cor</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Cão Poodle Branco"
          value={titulo}
          onChangeText={setTitulo}
          placeholderTextColor="#cbd5e1"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Informações Adicionais</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Ex: Visto perto do parque, usava coleira azul..."
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={4}
          placeholderTextColor="#cbd5e1"
        />
      </View>

      <View style={styles.section}>
        <BotaoPrimario
          titulo="Tirar Foto + Localização"
          onPress={capturarHardware}
        />
      </View>

      {fotoUri !== "" && (
        <View style={styles.hardwareContainer}>
          <Image source={{ uri: fotoUri }} style={styles.foto} />
          <View style={styles.gpsInfo}>
            <Text style={styles.gpsLabel}>Localização capturada:</Text>
            <Text style={styles.gpsTexto}>
              📍 {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.buttonSection}>
        <BotaoPrimario
          titulo={idParaEditar ? "Guardar Alterações" : " Registar Animal"}
          onPress={salvar}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8", paddingHorizontal: 16 },
  header: {
    paddingVertical: 20,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1e293b",
    letterSpacing: 0.3,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#1e293b",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  inputMultiline: {
    textAlignVertical: "top",
    paddingTop: 14,
  },
  hardwareContainer: {
    marginVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#22c55e",
  },
  foto: { width: "100%", height: 240, borderRadius: 12 },
  gpsInfo: {
    marginTop: 14,
  },
  gpsLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 6,
  },
  gpsTexto: {
    fontSize: 14,
    color: "#22c55e",
    fontWeight: "700",
  },
  buttonSection: {
    marginVertical: 20,
    marginBottom: 30,
  },
});
