import { View, Text, StyleSheet, Image } from "react-native";
import { Pet } from "../types/pet";
import { BotaoPrimario } from "./BotaoPrimario";

type Props = {
  pet: Pet;
  onEditar: () => void;
  onRemover: () => void;
  onMudarStatus: () => void;
};

export function CardPet({ pet, onEditar, onRemover, onMudarStatus }: Props) {
  const isEncontrado = pet.status === "encontrado";

  return (
    <View style={[styles.card, isEncontrado && styles.cardEncontrado]}>
      {pet.fotoUri ? (
        <Image source={{ uri: pet.fotoUri }} style={styles.foto} />
      ) : null}

      <View style={styles.infoContainer}>
        <Text style={styles.titulo}>{pet.titulo}</Text>
        <Text
          style={[
            styles.badge,
            isEncontrado ? styles.badgeVerde : styles.badgeVermelho,
          ]}
        >
          {isEncontrado ? "encontrado" : "perdido"}
        </Text>
        <Text style={styles.descricao}>{pet.descricao}</Text>
        <Text style={styles.gps}>
          Lat: {pet.latitude.toFixed(4)} | Lng: {pet.longitude.toFixed(4)}
        </Text>
      </View>

      <BotaoPrimario
        titulo={isEncontrado ? "Marcar como Perdido" : "Marcar como Encontrado"}
        onPress={onMudarStatus}
      />

      <View style={styles.botoesContainer}>
        <BotaoPrimario titulo="Editar" onPress={onEditar} />
        <BotaoPrimario titulo="Excluir" onPress={onRemover} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#ef4444",
  },
  cardEncontrado: { borderColor: "#22c55e", opacity: 0.85 },
  foto: { width: "100%", height: 200, borderRadius: 8, marginBottom: 10 },
  infoContainer: { marginBottom: 10 },
  titulo: { fontSize: 20, fontWeight: "bold", color: "#333" },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 6,
  },
  badgeVermelho: { backgroundColor: "#ef4444" },
  badgeVerde: { backgroundColor: "#22c55e" },
  descricao: { fontSize: 14, color: "#666" },
  gps: { fontSize: 12, color: "#999", marginTop: 6 },
  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
