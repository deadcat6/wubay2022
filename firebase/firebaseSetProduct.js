import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp, Timestamp,
  updateDoc
} from "firebase/firestore";
import {app, database, storage} from './firebase_config';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {v4 as uuidv4} from "uuid";

export async function newProduct(product, imageArray) {
  //console.log("newProduct")
  //console.log(product, imageArray)


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
    imagePath: [],
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
      seller: product.userId,
      paymentMethod: product.paymentMethod,
    }
  });
  if (imageArray.length === 0) {
    await updateDoc(doc(db, "products", docRef.id), {
      productId: docRef.id,
      imagePath: arrayUnion(
        `https://picsum.photos/seed/${docRef.id}/200/300`
      ),
    });
    return docRef.id;
  }

  imageArray.map(async (img) => {
    const storageRef = ref(storage, uuidv4());
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      () => {
      }, () => {
      }, () => {
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "products", docRef.id), {
            productId: docRef.id,
            imagePath: arrayUnion(
             downloadURL
            ),
          });
        })
      },
      (error) => {
        //console.log(error);
      }
    );
  });


  return docRef.id;
}

export async function removeProduct(productId) {
  const db = getFirestore(app);
  await deleteDoc(doc(db, "products", productId));

}

export async function setProduct(product, productId) {
  //console.log(product, productId)
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
    "transaction.state": transactions,
  });
}

export async function setProductPublish( productId, published) {
  const db = getFirestore(app);
  const docRef = doc(db, "products", productId);

  await updateDoc(docRef, {
    published: published,
  });
}

