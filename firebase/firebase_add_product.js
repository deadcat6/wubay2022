import { app, database } from './firebaseConfig';
import { collection, addDoc, getDocs, getDoc , doc} from 'firebase/firestore';
import signup from "./firebase_signup";

async function add_product(lister, price, name, description, imagePath, transactionType) { //TODO: add created_time later
    const db = collection(database, "products");

    //const transaction_types = ["none", "item swap", "venmo", "cash app", "other"];
    //transaction_types[transactionType]

    //missing price, lister
    await addDoc(db, {
        lister: lister, //this field should be obtained from the current user
        price: price, //rest is form data
        name: name,
        desc: description,
        image_url: imagePath,
        type: transactionType
    })

    }

export default add_product;




