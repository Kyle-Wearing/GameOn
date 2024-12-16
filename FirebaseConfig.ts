// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDuEZnQgioN2oop_yJ_Hd4VbFWpD-SePxU",
  authDomain: "gameon-eab29.firebaseapp.com",
  databaseURL:
    "https://gameon-eab29-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gameon-eab29",
  storageBucket: "gameon-eab29.firebasestorage.app",
  messagingSenderId: "894240099658",
  appId: "1:894240099658:web:58874bedee6e0367b705b3",
  measurementId: "G-0S12LSREMW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getDatabase();
