import {collection, query, where} from "firebase/firestore";
import {database} from "./firebaseConfig";

async function get_user_data(email) {

    // Create a reference to the cities collection

    //const db = collection(database, "products");
    const productsRef = collection(database, "products");

    // Create a query against the collection.
    return query(productsRef, where("lister", "==", email))
}


export default get_user_data;