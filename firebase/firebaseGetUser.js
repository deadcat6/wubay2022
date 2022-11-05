import {doc, setDoc, getFirestore, getDoc} from "firebase/firestore";
import { app } from './firebase_config';

export async function getFullUser(userId) {
  //Todo: filter out the not existed product
  const db = getFirestore(app);
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

