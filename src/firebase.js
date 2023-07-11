import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVoNZpLEfWpMbJgFN-Bhsa-BqB-5bJW8I",
  authDomain: "test-25dce.firebaseapp.com",
  databaseURL: "https://test-25dce-default-rtdb.firebaseio.com",
  projectId: "test-25dce",
  storageBucket: "test-25dce.appspot.com",
  messagingSenderId: "805650982205",
  appId: "1:805650982205:web:17bd65bddc94f860b2d154",
  measurementId: "G-E7PL9JVHC3",
  // storageBucket: 'gs://test-25dce.appspot.com'
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);



