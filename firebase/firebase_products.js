import { app, database } from './firebaseConfig';
import {collection, addDoc, getDocs, getDoc, doc, getFirestore, query, where} from 'firebase/firestore';

async function get_products() {
   // const db = collection(database, 'products');
    //const productSnapshot = await getDocs(db);
    //const productList = productSnapshot.docs.map(doc => doc.data());
    //console.log("list: " + productList);
    //return productList
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

export default get_products;
