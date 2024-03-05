import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0nIGFlnqAMZw61nsKUv5zjK9jiFpvDn4",
  authDomain: "shop-development-d1527.firebaseapp.com",
  projectId: "shop-development-d1527",
  storageBucket: "shop-development-d1527.appspot.com",
  messagingSenderId: "367198258793",
  appId: "1:367198258793:web:50b0f76ae6f1f464cac4f8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
