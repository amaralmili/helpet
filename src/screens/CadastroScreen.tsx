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
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Animal / Raça / Cor</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Cão Poodle Branco"
        value={titulo}
        onChangeText={setTitulo}
      />
      <Text style={styles.label}>Informações Adicionais</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Visto perto do parque, usava coleira azul..."
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={3}
      />
      <BotaoPrimario
        titulo="Tirar Foto + Capturar Localização"
        onPress={capturarHardware}
      />
      {fotoUri !== "" && (
        <View style={styles.hardwareContainer}>
          <Image source={{ uri: fotoUri }} style={styles.foto} />
          <Text style={styles.gpsTexto}>
            Lat: {latitude.toFixed(4)} | Lng: {longitude.toFixed(4)}
          </Text>
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        {}
        <BotaoPrimario
          titulo={idParaEditar ? "Guardar Alterações" : "Registar Animal"}
          onPress={salvar}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8fafc" },
  label: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 5 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  hardwareContainer: {
    alignItems: "center",
    marginVertical: 15,
    backgroundColor: "#f1f5f9",
    padding: 10,
    borderRadius: 8,
  },
  foto: { width: "100%", height: 200, borderRadius: 8 },
  gpsTexto: { marginTop: 8, color: "#64748b", fontWeight: "500" },
});
