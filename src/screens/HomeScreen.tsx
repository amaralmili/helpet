import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pet } from "../types/pet";
import {
  listarPets,
  excluirPet,
  alternarStatusPet,
} from "../repositories/petRepository";
import { BotaoPrimario } from "../components/BotaoPrimario";
import { CardPet } from "../components/CardPet";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const db = useSQLiteContext();
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      carregarPets();
    });
    return unsubscribe;
  }, [navigation]);

  async function carregarPets() {
    const resultado = await listarPets(db);
    setPets(resultado);
  }

  async function remover(id: number) {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          await excluirPet(db, id);
          carregarPets();
        },
      },
    ]);
  }

  async function mudarStatus(id: number, statusAtual: string) {
    await alternarStatusPet(db, id, statusAtual);
    carregarPets();
  }

  return (
    <View style={styles.container}>
      <BotaoPrimario
        titulo="Registrar Animal"
        onPress={() => navigation.navigate("Cadastro")}
      />
      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CardPet
            pet={item}
            onMudarStatus={() => mudarStatus(item.id, item.status)}
            onEditar={() =>
              navigation.navigate("Cadastro", { idParaEditar: item.id })
            }
            onRemover={() => remover(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8fafc" },
});
