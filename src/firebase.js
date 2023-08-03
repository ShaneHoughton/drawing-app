import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

export const actionCodeSettings = {
  url: 'https://sketchi.io',
  handleCodeInApp: false
};

const app = initializeApp(firebaseConfig,{
  authOptions: {
    sameSite: 'None', // or 'Strict' or 'Lax' based on your requirements
    secure: true, // true for cross-site requests
  },
});
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);