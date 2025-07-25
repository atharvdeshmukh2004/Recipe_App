// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import firebase from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXX9AAVmjE0zTz_vlOV7Gwjw8IfiMwTGk",
  authDomain: "ai-diet-planner-dc13d.firebaseapp.com",
  projectId: "ai-diet-planner-dc13d",
  storageBucket: "ai-diet-planner-dc13d.firebasestorage.app",
  messagingSenderId: "966881266068",
  appId: "1:966881266068:web:502f9bc9329a2149e9a781",
  measurementId: "G-HMP9S2F4ZM",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

// export const auth = initializeAuth(app, {
//     persistence:getReactNativePersistence(AsyncStorage)
// })

// Initialize Auth only once, associating it with the initialized app
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
