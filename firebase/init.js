import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-aRFbfbU0byQ-Hq2c-Vf23mkKGojCnNs",
  authDomain: "airbnb-clone-96ef7.firebaseapp.com",
  projectId: "airbnb-clone-96ef7",
  storageBucket: "airbnb-clone-96ef7.appspot.com",
  messagingSenderId: "993723852510",
  appId: "1:993723852510:web:b036cc707cb832a9d1c44f",
  measurementId: "G-CEB7H2BM14",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
