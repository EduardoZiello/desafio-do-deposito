import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const pages = [
  {
    title: "Poupar dinheiro pode ser mais simples.",

    subtitle: "Crie desafios inteligentes e acompanhe sua evolução.",
  },

  {
    title: "Transforme pequenos depósitos em grandes conquistas.",

    subtitle: "Cada valor guardado aproxima você do seu objetivo.",
  },

  {
    title: "Escolha seu primeiro desafio.",

    subtitle: "Comece hoje mesmo sua jornada financeira.",
  },
];

export default function OnboardingScreen() {
  const [page, setPage] = useState(0);

  const isLastPage = page === pages.length - 1;

  async function handleNext() {
    if (isLastPage) {
      await AsyncStorage.setItem("onboardingSeen", "true");

      router.replace("/");

      return;
    }

    setPage((prev) => prev + 1);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{pages[page].title}</Text>

        <Text style={styles.subtitle}>{pages[page].subtitle}</Text>
      </View>

      <View>
        <View style={styles.dotsContainer}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, page === index && styles.activeDot]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {isLastPage ? "Começar agora" : "Continuar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#0F172A",

    justifyContent: "space-between",

    paddingHorizontal: 30,

    paddingTop: 120,

    paddingBottom: 60,
  },

  title: {
    color: "#FFFFFF",

    fontSize: 40,

    fontWeight: "bold",

    lineHeight: 50,
  },

  subtitle: {
    color: "#94A3B8",

    fontSize: 18,

    marginTop: 24,

    lineHeight: 30,
  },

  dotsContainer: {
    flexDirection: "row",

    justifyContent: "center",

    marginBottom: 30,
  },

  dot: {
    width: 10,
    height: 10,

    borderRadius: 999,

    backgroundColor: "#334155",

    marginHorizontal: 6,
  },

  activeDot: {
    width: 28,

    backgroundColor: "#22C55E",
  },

  button: {
    backgroundColor: "#22C55E",

    paddingVertical: 22,

    borderRadius: 24,

    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 18,

    fontWeight: "bold",
  },
});
