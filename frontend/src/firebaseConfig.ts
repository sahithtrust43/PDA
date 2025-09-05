import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVLhpE-EwtTrViDvnkOhbdqrhJDM27QLg",
  authDomain: "hallowed-geode-470418-i1.firebaseapp.com",
  projectId: "hallowed-geode-470418-i1",
  storageBucket: "hallowed-geode-470418-i1.firebasestorage.app",
  messagingSenderId: "820936215972",
  appId: "1:820936215972:web:5fe086f750babd9cfc4531",
  measurementId: "G-1KSEPBM5T4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
