import {arrayRemove, arrayUnion, doc, getDoc, getFirestore, serverTimestamp, updateDoc} from "firebase/firestore";
import {app} from './firebase_config';

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

export async function removeMyProduct(userId, productId) {
  const db = getFirestore(app);
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, {
    myProducts: arrayRemove(productId)
  });
}

export async function addOrder(userId, productId) {
  const db = getFirestore(app);
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, {
    myOrders: arrayUnion(productId)
  });
}

export async function removeMyOrder(userId, productId) {
  const db = getFirestore(app);
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, {
    myOrders: arrayRemove(productId)
  });
}

export async function setRating(userId, rating) {
  const db = getFirestore(app);
  const docRef = doc(db, "users", userId);

  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return false;
  }
  let newRating = docSnap.data().rating;
  let ratingCount = 0;
  if (docSnap.data().ratingCount) {
    ratingCount = docSnap.data().ratingCount;
  }
  newRating = Math.round((ratingCount * newRating + rating) / (ratingCount + 1));
  await updateDoc(docRef, {
    rating: newRating,
    ratingCount: ratingCount + 1,
  });


  const userProductIds = docSnap.data().myProducts;

  for (const id of userProductIds) {
    if (id) {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        continue;
      }
      await updateDoc(docRef, {
        sellerRating: newRating
      });
    }
  }
  return true;
}


