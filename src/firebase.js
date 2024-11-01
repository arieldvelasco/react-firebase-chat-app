import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebase";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();