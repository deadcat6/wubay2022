import {doc, setDoc, getFirestore, getDoc} from "firebase/firestore";
import { app } from './firebase_config';
import {Avatar} from "@mui/material";

async function FirebaseLogin(user) {
  const db = getFirestore(app);
  const docRef = doc(db, "users", user.id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    //console.log(user)
    await setDoc(doc(db, "users", user.id), {
      username: "user"+user.id,
      password: '',
      email: user.email,
      firstname: '',
      lastname: '',
      phone: '',
      rating: 5,
      ratingCount: 0,
      myProducts: [],
      myOrders: [],
      usersChats: [],
      newUser: true,
      avatarUrl: user.image,
    });
  }

  const docsRef = doc(db, "users", user.id);
  const docsSnap = await getDoc(docsRef);
  return docsSnap.data();
}

export default FirebaseLogin;
