import {doc, setDoc, getFirestore, serverTimestamp} from "firebase/firestore";
import { app } from './firebase_config';

export async function newProduct(userId, userEmail, product) {
  const db = getFirestore(app);
  await setDoc(doc(db, "users", userId), {
    userId: userId,
    userEmail: userEmail,
    title: product.title,
    description: product.description,
    imagePath: product.imagePath,
    createdTime: serverTimestamp(),
    paymentMethod: product.paymentMethod,
    price: product.price,
    transaction: {
      stage: 'none',
      createdTime: null,
      buyer: null,
      seller: userId ,
      paymentMethod: product.paymentMethod,
    }
  });
}

