import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCVoNZpLEfWpMbJgFN-Bhsa-BqB-5bJW8I",
  authDomain: "test-25dce.firebaseapp.com",
  databaseURL: "https://test-25dce-default-rtdb.firebaseio.com",
  projectId: "test-25dce",
  storageBucket: "test-25dce.appspot.com",
  messagingSenderId: "805650982205",
  appId: "1:805650982205:web:17bd65bddc94f860b2d154",
  measurementId: "G-E7PL9JVHC3"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);