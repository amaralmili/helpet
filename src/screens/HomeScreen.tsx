import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert, Text } from "react-native";
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}> HelpPet</Text>
        <Text style={styles.headerSubtitle}>
          {pets.length} animal{pets.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <BotaoPrimario
          titulo="+ Registrar Animal"
          onPress={() => navigation.navigate("Cadastro")}
        />
      </View>

      {pets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhum animal registado</Text>
          <Text style={styles.emptySubtitle}>
            Comece registando um novo animal perdido
          </Text>
        </View>
      ) : (
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
          scrollEnabled={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#a855f7",
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
    fontWeight: "500",
  },
  buttonContainer: {
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
});
