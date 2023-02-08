// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxbl24psz1i7_ZetTIonGVTP3FIWBTVus",
  authDomain: "react-cursos-13554.firebaseapp.com",
  projectId: "react-cursos-13554",
  storageBucket: "react-cursos-13554.appspot.com",
  messagingSenderId: "554239325926",
  appId: "1:554239325926:web:fd2491d0cca311bcc96d27"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp) // Configuracion autenticación

export const FirebaseDB = getFirestore( FirebaseApp) // Configuración base de datos
