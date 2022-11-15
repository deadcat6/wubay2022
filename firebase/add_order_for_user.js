import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where,} from "firebase/firestore";
import {app, database} from "./firebaseConfig";

async function add_order_for_user(user_id, id) {

    const db = getFirestore(app)
    //const quer = query(collection(db, "products"), where("id", "==", id));
    const docRef = doc(db, "users", user_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
    }
    let userData = docSnap.data()
    let products_array = docSnap.data()['myOrders']
    products_array.append(id)
    userData['myOrders'] = products_array


    const res = await setDoc(docRef, userData);
    return res







}

export default add_order_for_user;
