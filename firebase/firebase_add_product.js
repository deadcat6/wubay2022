import { app, database } from './firebase_config';
import { collection, addDoc, getDocs, getDoc , doc} from 'firebase/firestore';
import signup from "./firebase_need_profile";

async function firebase_add_product(lister, lister_email, price, name, description, imagePath, transactionType) { //TODO: add created_time later
    const db = collection(database, "products");

    //const transaction_types = ["none", "item swap", "venmo", "cash app", "other"];
    //transaction_types[transactionType]

    //missing price, lister
    await addDoc(db, {
        lister: lister, //this field should be obtained from the current user
        lister_email: lister_email,
        price: price, //rest is form data
        name: name,
        desc: description,
        image_url: imagePath,
        type: transactionType,
        sell_progress: 0
    })

    }

export default firebase_add_product;




