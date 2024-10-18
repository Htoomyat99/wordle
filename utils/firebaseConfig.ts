import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD04tGDPKdc9_MAGL0sgjz1iLvzEyrHGa4",
  authDomain: "wordle-6bd03.firebaseapp.com",
  projectId: "wordle-6bd03",
  storageBucket: "wordle-6bd03.appspot.com",
  messagingSenderId: "383474649540",
  appId: "1:383474649540:web:6912f4b600ef60d1b17c91",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export const FIRESTORE_DB = getFirestore(app);
