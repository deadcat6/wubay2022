import {
  arrayRemove,
  arrayUnion, collection,
  doc,
  getDoc, getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import {app, database} from './firebase_config';

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

  const q = query(collection(db, "userChats"));
  const querySnapshot = await getDocs(q);
  const list = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.data())
    list.push(doc.id);
  });
  // console.log(list)
  for (const id of list) {
    //console.log(id)
    const Ref = doc(db, "userChats", id);
    const Snap = await getDoc(Ref);
    if (Snap.exists()) {
      //console.log(Snap.data())

      const map = new Map(Object.entries(Snap.data()));

      map.forEach(async (value, key)=>{
        // console.log("item")
        // console.log(key + value)

        if (value.userInfo.uid === userId) {
          await updateDoc(doc(database, "userChats", id), {
            [key + ".userInfo"]: {
              photoURL:value.userInfo.photoURL,
              uid: value.userInfo.uid,
              displayName: profile.username,
            }
          });
        }
      })
    }

  }

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


