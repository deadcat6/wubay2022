import {doc, arrayUnion, arrayRemove, getFirestore, getDoc, updateDoc} from "firebase/firestore";
import { app } from './firebase_config';

export async function setUserProfile(userId, profile) {
  const db = getFirestore(app);
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, {
    username: profile.username,
    firstname: profile.firstname,
    lastname: profile.lastname,
    phone: profile.phone,
    email: profile.email,
    newUser: false,
  });
}
export async function addProduct(userId, productId) {
  const db = getFirestore(app);
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, {
    myProducts: arrayUnion(productId)
  });
}
export async function addOrder(userId, productId) {
  const db = getFirestore(app);
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, {
    myOrders: arrayUnion(productId)
  });
}
export async function setRating(productId) {
  const db = getFirestore(app);
  const docRef = doc(db, "users", profile.id);
  const docSnap = await getDoc(docRef);
  let r = docSnap.data().rating;
  r += rating;
  r /= 2;
  await updateDoc(docRef, {
    rating: r,
  });
}
export async function setChat(chat) {
  const db = getFirestore(app);
  const docRef = doc(db, "users", profile.id);

  await updateDoc(docRef, {
    usersChats: arrayUnion(chat)
  });
}

