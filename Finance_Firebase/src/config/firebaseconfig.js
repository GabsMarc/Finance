import { initializeApp } from "firebase/app";
import { Firestore } from "firebase/firestore";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, updateDoc, setDoc, doc, getDoc, getDatabase, set, ref } from "firebase/firestore";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBnQTjhUTCStYZNHre-Dr48hKimEJFtW8s",
  authDomain: "finances-3751f.firebaseapp.com",
  projectId: "finances-3751f",
  storageBucket: "finances-3751f.appspot.com",
  messagingSenderId: "828366803971",
  appId: "1:828366803971:web:90dfa6fa5427bfecc42a36"
};


const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
export const FIREBASE_AUTH = getAuth(app)

export {app, database, getFirestore, collection, addDoc, getDocs, Firestore, deleteDoc, updateDoc, setDoc, doc, getDoc, getDatabase, set, ref}