import {collection, getDocs, getFirestore, query, where,} from "firebase/firestore";
import {app, database} from "./firebaseConfig";

async function get_product_by_id(id) {

    const db = getFirestore(app)
    const quer = query(collection(db, "products"), where("id", "==", id));
    let product = {}
    const querySnapshot = await getDocs(quer);
    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    product = doc.data()
     })
    return product


}

export default get_product_by_id;
