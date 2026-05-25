import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const calculateTotal = (number: number) => {
  return (number * (number + 1)) / 2;
};

const options = [
  ...Array.from({ length: 10 }, (_, i) => {
    const amount = (i + 1) * 10;

    return {
      amount,
      total: calculateTotal(amount),
    };
  }),

  ...[150, 200].map((amount) => ({
    amount,
    total: calculateTotal(amount),
  })),
];

export default function CreateChallengeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Qual o tamanho do seu desafio?</Text>

        <Text style={styles.subtitle}>
          Escolha quantos depósitos deseja completar
        </Text>

        {options.map((item) => (
          <TouchableOpacity
            key={item.amount}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/challenge/[id]",
                params: {
                  id: item.amount.toString(),
                  name: `${item.amount} depósitos`,
                  total: item.amount.toString(),
                },
              })
            }
          >
            <Text style={styles.cardTitle}>{item.amount} depósitos</Text>

            <Text style={styles.cardValue}>
              R$ {item.total.toLocaleString("pt-BR")}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.specialCard}
          onPress={() =>
            router.push({
              pathname: "/challenge/[id]",
              params: {
                id: "365",
                name: "Desafio 365",
                total: "365",
              },
            })
          }
        >
          <Text style={styles.specialTitle}>🔥 Desafio 365</Text>

          <Text style={styles.specialSubtitle}>
            1 depósito por dia durante 1 ano
          </Text>

          <Text style={styles.specialValue}>
            R$ {calculateTotal(365).toLocaleString("pt-BR")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customCard}
          onPress={() => router.push("/custom-challenge")}
        >
          <Text style={styles.customTitle}>⚙️ Personalizado</Text>

          <Text style={styles.customSubtitle}>
            Escolha sua própria quantidade de depósitos
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  content: {
    padding: 24,

    paddingTop: 60,

    paddingBottom: 220,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",

    marginTop: 10,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: "#94A3B8",
    marginBottom: 40,
  },

  card: {
    backgroundColor: "#1E293B",

    padding: 24,

    borderRadius: 28,

    marginBottom: 18,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#334155",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 5,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4ADE80",
  },
  specialCard: {
    backgroundColor: "#111827",

    borderRadius: 28,
    padding: 24,
    marginTop: 24,

    borderWidth: 1.5,
    borderColor: "#22C55E",

    shadowColor: "#22C55E",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,

    elevation: 8,
  },

  specialTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  specialSubtitle: {
    color: "#CBD5E1",
    marginTop: 8,
    fontSize: 15,
  },

  specialValue: {
    color: "#4ADE80",
    marginTop: 18,
    fontSize: 24,
    fontWeight: "bold",
  },

  customCard: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 24,
    marginTop: 18,
    marginBottom: 40,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#CBD5E1",
  },

  customTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
  },

  customSubtitle: {
    marginTop: 8,
    color: "#64748B",
    fontSize: 15,
  },
  backButton: {
    marginBottom: 20,
  },
});
