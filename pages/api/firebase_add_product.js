import { app, database } from './firebaseConfig';
import { collection, addDoc, getDocs, getDoc , doc} from 'firebase/firestore';
import signup from "./firebase_signup";

async function add_product(lister, price, desc, title, image_url) { //TODO: add created_time later
    const db = collection(database, "products");


    await addDoc(db, {
        lister: lister, //this field should be obtained from the current user
        price: price, //rest is form data
        desc: desc,
        title: title,
        image_url: image_url,
    })

    }

export default add_product;




