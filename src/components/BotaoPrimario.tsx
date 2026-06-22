import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  titulo: string;
  onPress: () => void;
};

export function BotaoPrimario({ titulo, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.botao}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: "#a855f7",
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  texto: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
