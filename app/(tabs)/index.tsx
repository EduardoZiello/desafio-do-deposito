import { router } from "expo-router";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChallenges } from "../../context/ChallengeContext";
const logo = require("../../assets/images/logo.png");

export default function HomeScreen() {
  const { challenges, removeChallenge } = useChallenges();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Desafio do Depósito</Text>

        <Text style={styles.subtitle}>Seu desafio inteligente de economia</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/create-challenge")}
        >
          <Text style={styles.buttonText}>+ Novo desafio</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Meus desafios</Text>

        {challenges.map((challenge) => {
          const saved = challenge.selectedNumbers.reduce(
            (acc, current) => acc + current,
            0,
          );

          const progress = (saved / challenge.total) * 100;
          const isCompleted = progress >= 100;

          return (
            <TouchableOpacity
              key={challenge.id}
              style={[
                styles.challengeCard,

                isCompleted && styles.completedCard,

                challenge.name === "Desafio 365" && styles.specialChallengeCard,
              ]}
              onPress={() =>
                router.push({
                  pathname: "/challenge/[id]",
                  params: {
                    id: challenge.id,
                    name: challenge.name,
                    total: challenge.depositCount.toString(),
                  },
                })
              }
            >
              <View style={styles.challengeHeader}>
                <Text
                  style={[
                    styles.challengeName,

                    challenge.name === "Desafio 365" &&
                      styles.specialChallengeTitle,
                  ]}
                >
                  {challenge.name === "Desafio 365"
                    ? "🔥 Desafio 365"
                    : challenge.name}
                </Text>

                {isCompleted ? (
                  <Text style={styles.completedBadge}>🏆 CONCLUÍDO</Text>
                ) : (
                  <Text style={styles.challengePercentage}>
                    {progress.toFixed(0)}%
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  Alert.alert(
                    "Excluir desafio",
                    "Deseja realmente excluir este desafio?",
                    [
                      {
                        text: "Cancelar",
                        style: "cancel",
                      },

                      {
                        text: "Excluir",
                        style: "destructive",

                        onPress: () => removeChallenge(challenge.id),
                      },
                    ],
                  )
                }
              >
                <Text style={styles.deleteButtonText}>✕</Text>
              </TouchableOpacity>

              <View style={styles.challengeProgressBackground}>
                <View
                  style={[
                    styles.challengeProgressFill,
                    {
                      width: `${progress}%`,
                    },
                  ]}
                />
              </View>

              <View style={styles.challengeFooter}>
                <Text style={styles.challengeSaved}>
                  R$ {saved.toLocaleString("pt-BR")}
                </Text>

                <Text style={styles.challengeTotal}>
                  de R$ {challenge.total.toLocaleString("pt-BR")}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",

    paddingHorizontal: 24,
    paddingTop: 20,

    alignItems: "stretch",
  },
  completedBadge: {
    color: "#FACC15",

    fontSize: 14,

    fontWeight: "bold",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#22C55E",

    paddingVertical: 20,

    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 50,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 20,
    resizeMode: "contain",
    alignSelf: "center",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
  },

  challengeCard: {
    backgroundColor: "#111827",

    borderRadius: 24,
    padding: 20,
    marginBottom: 16,

    borderWidth: 1,
    borderColor: "#1E293B",

    width: "100%",
  },

  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  challengeName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  challengePercentage: {
    color: "#4ADE80",
    fontSize: 18,
    fontWeight: "bold",
  },

  challengeProgressBackground: {
    height: 10,

    backgroundColor: "#1E293B",
    borderRadius: 999,

    overflow: "hidden",
    marginTop: 18,
  },

  challengeProgressFill: {
    height: "100%",
    backgroundColor: "#22C55E",
    borderRadius: 999,
  },

  challengeFooter: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 16,
  },

  challengeSaved: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  challengeTotal: {
    color: "#94A3B8",
    marginLeft: 8,
  },
  specialChallengeCard: {
    borderColor: "#22C55E",
    borderWidth: 2,

    shadowColor: "#22C55E",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,

    elevation: 10,

    backgroundColor: "#0F172A",
  },

  specialChallengeTitle: {
    color: "#4ADE80",
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: -4,

    width: 28,
    height: 28,

    borderRadius: 999,

    backgroundColor: "#1E293B",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 1,
  },

  deleteButtonText: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "bold",
  },
  completedCard: {
    borderColor: "#FACC15",

    shadowColor: "#FACC15",

    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.35,

    shadowRadius: 12,

    elevation: 10,
  },
});
