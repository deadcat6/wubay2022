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
    //console.log(doc.data())
    const p = doc.data();
    list.push({...p, id: doc.id});
  });
  //console.log(list);
  return list;

}
export async function getProduct(productId) {

  const db = getFirestore(app);
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let product = docSnap.data();
    const userRef = doc(db, "users", product.userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      product = {
        ...product,
        sellerRating: userSnap.data().rating,
        username: userSnap.data().username == '' ? userSnap.data().email : userSnap.data().username
      }
      return product;
    }
  }

  return null;
}

