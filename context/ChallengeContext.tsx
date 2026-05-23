import React, { createContext, useContext, useState } from "react";

type Challenge = {
  id: string;
  name: string;
  total: number;
  selectedNumbers: number[];
};

type ChallengeContextData = {
  challenges: Challenge[];
  addChallenge: (challenge: Challenge) => void;
};

const ChallengeContext = createContext<ChallengeContextData>(
  {} as ChallengeContextData,
);

export function ChallengeProvider({ children }: any) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  function addChallenge(challenge: Challenge) {
    setChallenges((prev) => [...prev, challenge]);
  }

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        addChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenges() {
  return useContext(ChallengeContext);
}
