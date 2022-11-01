// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebase_config = {
   apiKey: "AIzaSyD-NjcUVatrOC8Q8BibrkGm9GTiigo5R_Y",
   authDomain: "wubay-26c62.firebaseapp.com",
   projectId: "wubay-26c62",
   storageBucket: "wubay-26c62.appspot.com",
   messagingSenderId: "38490000134",
   appId: "1:38490000134:web:37a5ad02b5dd45612bac87",
   measurementId: "G-BSS58G0MGQ"
};
 
// Initialize Firebase
export const app = initializeApp(firebase_config);
export const database = getFirestore(app)