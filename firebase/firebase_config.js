// Import the functions you need from the SDKs you need
import { getStorage } from 'firebase/storage'

import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebase_config = {
//    apiKey: "AIzaSyD-NjcUVatrOC8Q8BibrkGm9GTiigo5R_Y",
//    authDomain: "wubay-26c62.firebaseapp.com",
//    projectId: "wubay-26c62",
//    storageBucket: "wubay-26c62.appspot.com",
//    messagingSenderId: "38490000134",
//    appId: "1:38490000134:web:37a5ad02b5dd45612bac87",
//    measurementId: "G-BSS58G0MGQ"
// };

const firebaseConfig = {
   apiKey: "AIzaSyB3I022Vzc9v_7wQjOHzB1c0nxm1m_8Q_s",
   authDomain: "wubay2022.firebaseapp.com",
   projectId: "wubay2022",
   storageBucket: "wubay2022.appspot.com",
   messagingSenderId: "842303643578",
   appId: "1:842303643578:web:286423df7e7d6a5f558783"
};
 
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const storage = getStorage(app)

