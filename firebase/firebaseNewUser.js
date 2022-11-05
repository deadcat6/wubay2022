import {doc, setDoc, getFirestore, getDoc} from "firebase/firestore";
import { app } from './firebase_config';

async function firebaseNewUser(user) {
  const db = getFirestore(app);
  const docRef = doc(db, "users", user.id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(doc(db, "users", user.id), {
      username: '',
      password: '',
      email: user.email,
      firstname: '',
      lastname: '',
      phone: '',
      rating: 5,
      myProducts: [],
      myOrders: [],
      usersChats: [],
      newUser: true,
    });
    return true;
  }
  return docSnap.data().newUser;
}

export default firebaseNewUser;
