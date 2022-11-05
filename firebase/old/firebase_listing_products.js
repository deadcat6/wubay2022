import { app, database } from '../firebase_config';
import {collection, addDoc, getDocs, getDoc, doc, getFirestore, query, where} from 'firebase/firestore';

async function firebase_get_products() {

    const db = getFirestore(app)
    const quer = query(collection(db, "products"));

    const querySnapshot = await getDocs(quer);
    let products_info = []
    let products_id = []
    let i =0
    querySnapshot.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data());
    products_info.push(doc.data())
        //console.log(typeof(products_info[i]['desc']))
        products_info[i]['id'] = doc.id
        //console.log(products_info[i])
        i = i + 1

    })

    return products_info
}

export default firebase_get_products;
