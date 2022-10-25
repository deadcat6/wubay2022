import {collection, getDocs, getDoc,getFirestore, query, where,doc} from "firebase/firestore";
import {app, database} from "./firebaseConfig";

async function get_product_by_id(id) {

    const db = getFirestore(app)
    //const quer = query(collection(db, "products"), where("id", "==", id));
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    }
    return docSnap.data()

    //let product = {}
   // const querySnapshot = await getDocs(quer);
    //querySnapshot.forEach((doc) => {
   // console.log(doc.id, " => ", doc.data());
    //product = doc.data()
    // })
   // return product


}

export default get_product_by_id;
