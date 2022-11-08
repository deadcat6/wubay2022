import {collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where,} from "firebase/firestore";
import {app, database} from "./firebaseConfig";

async function delete_product_by_id(id) {

    const db = getFirestore(app)
    //const quer = query(collection(db, "products"), where("id", "==", id));
    const docRef = doc(db, "products", id);

    await updateDoc(docRef, {
        capital: deleteField()
    });

    return true;
    //const docSnap = await getDoc(docRef);

    //if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
   // }

   // return docSnap.data()


}

export default delete_product_by_id;
