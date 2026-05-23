import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const logo = require("../../assets/images/logo.png");

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Desafio do Depósito</Text>

      <Text style={styles.subtitle}>Seu desafio inteligente de economia</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/create-challenge")}
      >
        <Text style={styles.buttonText}>+ Novo desafio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
  },

  button: {
    marginTop: 40,
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 20,
    resizeMode: "contain",
  },
});
