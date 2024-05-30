import { firebaseConfig } from "@/config";
import { initializeApp } from "firebase/app";

const firebaseConfigs = {
  apiKey: firebaseConfig?.apiKey,
  authDomain: firebaseConfig?.authDomain,
  projectId: firebaseConfig?.projectId,
  storageBucket: firebaseConfig?.storageBucket,
  messagingSenderId: firebaseConfig?.messagingSenderId,
  appId: firebaseConfig?.appId,
  measurementId: firebaseConfig?.measurementId,
};

const app = initializeApp(firebaseConfigs);

export default app;
