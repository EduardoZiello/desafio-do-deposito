import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebaseConfig";

export async function anonymousLogin() {
  try {
    const userCredential = await signInAnonymously(auth);

    console.log("Usuário logado:", userCredential.user.uid);

    return userCredential.user;
  } catch (error) {
    console.log("Erro no login anônimo:", error);
  }
}
