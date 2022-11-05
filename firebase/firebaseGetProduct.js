import {doc, getFirestore, getDoc, query, where, collection, getDocs} from "firebase/firestore";
import { app } from './firebase_config';

export async function getAllProducts() {
  const db = getFirestore(app);
  //const q = query(collection(db, "products"), where("capital", "==", true));
  const q = query(collection(db, "products"));
  const querySnapshot = await getDocs(q);
  const list = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const p = doc.data();
    list.push({...p, id: doc.id});
  });
  console.log(list);
  return list;

}
export async function getProduct(productId) {
  const db = getFirestore(app);
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

