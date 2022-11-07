import {deleteDoc, getFirestore, serverTimestamp, addDoc, collection, doc, updateDoc, getDoc} from "firebase/firestore";
import { app } from './firebase_config';

export async function newProduct( product) {
  const db = getFirestore(app);
  const userRef = doc(db, "users", product.userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    return null
  }

  const docRef = await addDoc(collection(db, "products"), {
    userId: product.userId,
    userEmail: product.userEmail,
    title: product.title,
    description: product.description,
    imagePath: product.imagePath,
    updateTime: serverTimestamp(),
    paymentMethod: product.paymentMethod,
    category: product.category,
    price: product.price,
    sellerRating: userSnap.data().rating,
    published: true,
    transaction: {
      state: 'Published',
      createdTime: null,
      buyer: null,
      seller: product.userId ,
      paymentMethod: product.paymentMethod,
    }
  });
  return docRef.id;
}

export async function removeProduct( productId) {
  const db = getFirestore(app);
  await deleteDoc(doc(db, "products", productId));

}
export async function setProduct(product, productId) {
  const db = getFirestore(app);
  const docRef = doc(db, "products", productId);
  const userRef = doc(db, "users", product.userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    return null
  }
  await updateDoc(docRef, {
    title: product.title,
    description: product.description,
    imagePath: product.imagePath,
    updateTime: serverTimestamp(),
    paymentMethod: product.paymentMethod,
    category: product.category,
    sellerRating: userSnap.data().rating,
    price: product.price,
    published: true,
    "transaction.paymentMethod": product.paymentMethod,
  });
}

export async function setTransaction(transactions, productId) {
  const db = getFirestore(app);
  const docRef = doc(db, "products", productId);

  await updateDoc(docRef, {
    "transaction.paymentMethod": product.state,
  });
}

export async function setProductPublish(product, productId) {
  const db = getFirestore(app);
  const docRef = doc(db, "products", productId);

  await updateDoc(docRef, {
    published: product.published,
  });
}

