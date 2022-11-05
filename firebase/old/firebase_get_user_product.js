import {collection, query, where, getFirestore, getDocs} from "firebase/firestore";
import {app,database} from "../firebase_config";


async function firebase_get_user_product(username) {

    const db = getFirestore(app)
    const quer = query(collection(db, "products"), where("lister", "==", username));

    const querySnapshot = await getDocs(quer);
    let products_info = []
    let products_id = []
    querySnapshot.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data());
    products_info.push(doc.data())
        products_id.push(doc.id)

    })

    return [products_info,products_id]
}

export default firebase_get_user_product;
