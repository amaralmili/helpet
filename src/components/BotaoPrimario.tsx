import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  titulo: string;
  onPress: () => void;
};

export function BotaoPrimario({ titulo, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: "#b625eb",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  texto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
