import { app, database } from './firebaseConfig';
import { collection, addDoc, getDocs, getDoc , doc} from 'firebase/firestore';

async function get_products() {
    const db = collection(database, 'products');
    const productSnapshot = await getDocs(db);
    const productList = productSnapshot.docs.map(doc => doc.data());
    //console.log("list: " + productList);
    return productList
}

export default get_products;
