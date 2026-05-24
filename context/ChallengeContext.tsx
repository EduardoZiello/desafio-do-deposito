import React, { createContext, useContext, useState } from "react";

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
};

const ChallengeContext = createContext<ChallengeContextData>(
  {} as ChallengeContextData,
);

export function ChallengeProvider({ children }: any) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

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

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        addChallenge,
        updateChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenges() {
  return useContext(ChallengeContext);
}
