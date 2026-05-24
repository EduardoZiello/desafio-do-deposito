import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type Challenge = {
  id: string;
  name: string;
  total: number;
  depositCount: number;
  selectedNumbers: number[];
};

type ChallengeContextData = {
  challenges: Challenge[];

  addChallenge: (challenge: Challenge) => void;

  updateChallenge: (id: string, selectedNumbers: number[]) => void;
  removeChallenge: (id: string) => void;
};

const ChallengeContext = createContext<ChallengeContextData>(
  {} as ChallengeContextData,
);

export function ChallengeProvider({ children }: any) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  useEffect(() => {
    loadChallenges();
  }, []);
  useEffect(() => {
    saveChallenges(challenges);
  }, [challenges]);

  function addChallenge(challenge: Challenge) {
    setChallenges((prev) => [...prev, challenge]);
  }

  function updateChallenge(id: string, selectedNumbers: number[]) {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id
          ? {
              ...challenge,
              selectedNumbers,
            }
          : challenge,
      ),
    );
  }
  function removeChallenge(id: string) {
    setChallenges((prev) => prev.filter((challenge) => challenge.id !== id));
  }
  async function saveChallenges(challengesData: Challenge[]) {
    await AsyncStorage.setItem("@desafios", JSON.stringify(challengesData));
  }

  async function loadChallenges() {
    const storage = await AsyncStorage.getItem("@desafios");

    if (storage) {
      setChallenges(JSON.parse(storage));
    }
  }

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        addChallenge,
        updateChallenge,
        removeChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenges() {
  return useContext(ChallengeContext);
}
