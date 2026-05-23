import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChallengeScreen() {
  const { id } = useLocalSearchParams();

  const totalNumbers = Number(id);

  const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((item) => item !== number));

      return;
    }

    setSelectedNumbers([...selectedNumbers, number]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desafio {id}</Text>

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
});
