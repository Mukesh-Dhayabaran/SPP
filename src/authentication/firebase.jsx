import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAliekmxv6-uHPA8bny3lS36deWM_bNdOs",
  authDomain: "student-performance-pred-it205.firebaseapp.com",
  projectId: "student-performance-pred-it205",
  storageBucket: "student-performance-pred-it205.firebasestorage.app",
  messagingSenderId: "125680389060",
  appId: "1:125680389060:web:dc907af1f62aa0b4e4f291",
  measurementId: "G-N6LRYXM4CE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export  {auth,provider,signInWithRedirect,signInWithPopup};
