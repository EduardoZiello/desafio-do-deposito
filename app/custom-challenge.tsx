import { router } from "expo-router";
import { useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CustomChallengeScreen() {
  const [amount, setAmount] = useState(50);
  const [challengeName, setChallengeName] = useState("");

  const increase = () => {
    setAmount((prev) => prev + 1);
  };

  const decrease = () => {
    if (amount <= 1) return;

    setAmount((prev) => prev - 1);
  };

  const total = (amount * (amount + 1)) / 2;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desafio personalizado</Text>

      <Text style={styles.subtitle}>Quantos depósitos deseja completar?</Text>
      <Text style={styles.inputLabel}>Nome do desafio</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Minha Moto"
        placeholderTextColor="#64748B"
        value={challengeName}
        onChangeText={setChallengeName}
      />

      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.counterButton} onPress={decrease}>
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.amount}>{amount}</Text>

        <TouchableOpacity style={styles.counterButton} onPress={increase}>
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.totalLabel}>Total acumulado</Text>

      <Text style={styles.totalValue}>R$ {total.toLocaleString("pt-BR")}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/challenge/[id]",
            params: {
              id: amount.toString(),
              name: challengeName,
              total: amount.toString(),
            },
          })
        }
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 24,
    justifyContent: "center",
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
  },

  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 50,
  },

  counterButton: {
    width: 70,
    height: 70,

    borderRadius: 20,
    backgroundColor: "#1E293B",

    justifyContent: "center",
    alignItems: "center",
  },

  counterButtonText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
  },

  amount: {
    color: "#FFFFFF",
    fontSize: 52,
    fontWeight: "bold",
    marginHorizontal: 30,
  },

  totalLabel: {
    marginTop: 50,
    color: "#94A3B8",
    fontSize: 16,
    textAlign: "center",
  },

  totalValue: {
    marginTop: 12,
    color: "#4ADE80",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    marginTop: 50,
    backgroundColor: "#22C55E",
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputLabel: {
    marginTop: 40,
    marginBottom: 10,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    color: "#FFFFFF",
    fontSize: 16,

    borderWidth: 1,
    borderColor: "#334155",
  },
});
