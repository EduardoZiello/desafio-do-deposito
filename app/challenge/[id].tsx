import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChallenges } from "../../context/ChallengeContext";

export default function ChallengeScreen() {
  const { challenges, addChallenge, updateChallenge } = useChallenges();
  const { id, total, name } = useLocalSearchParams();
  console.log("PARAMS:", {
    id,
    total,
    name,
  });
  const challengeName = typeof name === "string" ? name : `Desafio ${id}`;
  const existingChallenge = challenges.find((challenge) => challenge.id === id);

  const totalNumbers = Number(total);

  const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>(
    existingChallenge?.selectedNumbers || [],
  );

  const toggleNumber = (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((item) => item !== number));

      return;
    }

    setSelectedNumbers([...selectedNumbers, number]);
  };
  const totalSaved = selectedNumbers.reduce((acc, current) => acc + current, 0);

  const challengeTotal = numbers.reduce((acc, current) => acc + current, 0);

  const remaining = challengeTotal - totalSaved;
  const progress = (totalSaved / challengeTotal) * 100;
  const isCompleted = progress >= 100;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.title}>{name ? name : `Desafio ${id}`}</Text>
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Guardado</Text>

          <Text style={styles.savedValue}>
            R$ {totalSaved.toLocaleString("pt-BR")}
          </Text>
        </View>

        <View>
          <Text style={styles.summaryLabel}>Falta</Text>

          <Text style={styles.remainingValue}>
            R$ {remaining.toLocaleString("pt-BR")}
          </Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${progress}%`,
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
            },
          ]}
        />

        <Text style={styles.progressText}>{progress.toFixed(0)}%</Text>
      </View>

      <FlatList
        data={numbers}
        keyExtractor={(item) => item.toString()}
        numColumns={4}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.numberCard,
              selectedNumbers.includes(item) && styles.numberCardSelected,
            ]}
            onPress={() => toggleNumber(item)}
          >
            <Text style={styles.numberText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      {isCompleted && (
        <ConfettiCannon count={120} origin={{ x: -10, y: 0 }} fadeOut />
      )}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          if (existingChallenge) {
            updateChallenge(existingChallenge.id, selectedNumbers);
          } else {
            addChallenge({
              id: Date.now().toString(),
              name: challengeName,
              total: challengeTotal,
              depositCount: totalNumbers,
              selectedNumbers,
              createdAt: Date.now(),
            });
          }

          router.push("/");
        }}
      >
        <Text style={styles.saveButtonText}>Salvar desafio</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",

    marginTop: 10,
    marginBottom: 10,
  },

  list: {
    paddingTop: 10,
    paddingBottom: 60,
  },

  numberCard: {
    flex: 1,

    backgroundColor: "#1E293B",

    margin: 8,

    height: 92,

    borderRadius: 28,

    overflow: "hidden",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#334155",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 6,
  },

  numberText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",

    zIndex: 1,
  },
  numberCardSelected: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },

  numberTextSelected: {
    color: "#FFFFFF",
  },
  summaryCard: {
    backgroundColor: "#111827",

    borderRadius: 32,

    paddingVertical: 28,
    paddingHorizontal: 26,

    marginTop: 30,

    flexDirection: "row",
    justifyContent: "space-between",

    borderWidth: 1,
    borderColor: "#1E293B",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,

    elevation: 10,
  },

  summaryLabel: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 8,
  },

  savedValue: {
    color: "#4ADE80",
    fontSize: 26,
    fontWeight: "bold",
  },

  remainingValue: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
  },
  progressContainer: {
    height: 22,

    backgroundColor: "#1E293B",

    borderRadius: 999,

    overflow: "hidden",

    marginTop: 30,
    marginBottom: 40,
  },

  progressBar: {
    height: "100%",

    backgroundColor: "#22C55E",

    borderRadius: 999,

    shadowColor: "#22C55E",
    shadowOpacity: 0.6,
    shadowRadius: 10,

    elevation: 5,
  },

  progressText: {
    position: "absolute",

    alignSelf: "center",

    color: "#FFFFFF",

    fontWeight: "bold",

    fontSize: 13,

    zIndex: 10,
  },

  saveButton: {
    backgroundColor: "#22C55E",

    paddingVertical: 22,

    borderRadius: 28,

    alignItems: "center",

    marginTop: 30,
    marginBottom: 50,

    shadowColor: "#22C55E",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,

    elevation: 10,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginBottom: 20,
  },
});
