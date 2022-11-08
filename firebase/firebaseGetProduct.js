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
    list.push({...p, id: doc.id,});
  });
  //console.log(list);
  return list;

}
export async function getProductDetailPage(productId) {

  const db = getFirestore(app);
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    //console.log(docSnap.data())
    let product = docSnap.data();
    const userRef = doc(db, "users", product.userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      product = {
        ...product,
        updateTime: product.updateTime.toDate(),
        sellerRating: userSnap.data().rating,
        username: userSnap.data().username == '' ? userSnap.data().email : userSnap.data().username
      }
      return product;
    }
  }
  return null;
}

export async function getMyProducts(userId) {
  const db = getFirestore(app);
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    return [];
  }
  const userProductIds = userSnap.data().myProducts;
  const myProducts = [];

  for (const id of userProductIds) {
    //console.log(id)

    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const p = docSnap.data();
      myProducts.push({...p, id, updateTime: p.updateTime.toDate(),});
    }
  }
  return myProducts;
}

export async function getMyOrders(userId) {
  const db = getFirestore(app);
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    return [];
  }
  const userOrdersIds = userSnap.data().myOrders;
  const myOrders = [];
  for (let id of userOrdersIds) {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const p = docSnap.data();
      myOrders.push({...p, id, updateTime: p.updateTime.toDate(),});
    }
  }
  return myOrders;
}
