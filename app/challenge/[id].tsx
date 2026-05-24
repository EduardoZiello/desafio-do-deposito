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

  return (
    <View style={styles.container}>
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
        <View style={[styles.progressBar, { width: `${progress}%` }]} />

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
            });
          }

          router.push("/");
        }}
      >
        <Text style={styles.saveButtonText}>Salvar desafio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 24,
  },

  list: {
    paddingBottom: 40,
  },

  numberCard: {
    flex: 1,
    backgroundColor: "#1E293B",
    margin: 8,
    height: 80,
    borderRadius: 20,
    overflow: "hidden",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#334155",
  },

  numberText: {
    fontSize: 22,
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
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,

    flexDirection: "row",
    justifyContent: "space-between",
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
    height: 26,
    backgroundColor: "#1E293B",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 30,

    justifyContent: "center",
  },

  progressBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,

    backgroundColor: "#22C55E",
    borderRadius: 999,
  },

  progressText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#22C55E",
    paddingVertical: 20,
    borderRadius: 20,

    alignItems: "center",

    marginTop: 20,
    marginBottom: 40,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
