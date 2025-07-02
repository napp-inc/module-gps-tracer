import { initializeApp } from "firebase/app";
import { 
  getAuth, initializeAuth, getReactNativePersistence
} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBtGIHGpjOcISAxUL90Jtz2oj8Kb5p4ZjA",
  authDomain: "stagiaire-2025.firebaseapp.com",
  projectId: "stagiaire-2025",
  storageBucket: "stagiaire-2025.appspot.com",
  messagingSenderId: "471560127076",
  appId: "1:471560127076:web:6760e84408894106545571"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, db };



// import { initializeApp } from 'firebase/app';

// // Optionally import the services that you want to use
// import {signInWithEmailAndPassword} from 'firebase/auth';
// // import {...} from 'firebase/database';
// // import {...} from 'firebase/firestore';
// // import {...} from 'firebase/functions';
// // import {...} from 'firebase/storage';

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyBtGIHGpjOcISAxUL90Jtz2oj8Kb5p4ZjA",
//   authDomain: "stagiaire-2025.firebaseapp.com",
//   projectId: "stagiaire-2025",
//   storageBucket: "stagiaire-2025.appspot.com",
//   messagingSenderId: "471560127076",
//   appId: "1:471560127076:web:6760e84408894106545571"
// };

// const app = initializeApp(firebaseConfig);

// export { signInWithEmailAndPassword }
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
