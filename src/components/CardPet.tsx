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
          {isEncontrado ? "Encontrado" : "Perdido"}
        </Text>
        <Text style={styles.descricao}>{pet.descricao}</Text>
        <Text style={styles.gps}>
          <Text style={styles.gps}>
            📍{" "}
            {pet.endereco ||
              `Lat: ${pet.latitude.toFixed(4)} | Lng: ${pet.longitude.toFixed(4)}`}
          </Text>
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: "#ef4444",
  },
  cardEncontrado: { borderLeftColor: "#22c55e", opacity: 0.95 },
  foto: { width: "100%", height: 220, borderRadius: 12, marginBottom: 14 },
  infoContainer: { marginBottom: 14 },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
    letterSpacing: 0.3,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    marginVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  badgeVermelho: { backgroundColor: "#ef4444" },
  badgeVerde: { backgroundColor: "#22c55e" },
  descricao: { fontSize: 15, color: "#475569", lineHeight: 22 },
  gps: { fontSize: 13, color: "#94a3b8", marginTop: 10, fontWeight: "500" },
  botoesContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
});
