import {getFirestore, serverTimestamp, addDoc, collection} from "firebase/firestore";
import { app } from './firebase_config';

export async function newProduct( product) {
  const db = getFirestore(app);
  const docRef = await addDoc(collection(db, "products"), {
    userId: product.userId,
    userEmail: product.userEmail,
    title: product.title,
    description: product.description,
    imagePath: product.imagePath,
    updateTime: serverTimestamp(),
    paymentMethod: product.paymentMethod,
    price: product.price,
    transaction: {
      stage: 'none',
      createdTime: null,
      buyer: null,
      seller: product.userId ,
      paymentMethod: product.paymentMethod,
    }
  });
  return docRef.id;
}

