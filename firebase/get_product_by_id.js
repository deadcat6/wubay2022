import {collection, query, where} from "firebase/firestore";
import {database} from "./firebaseConfig";

async function get_product_by_id(id) {

    // Create a reference to the cities collection

    //const db = collection(database, "products");
    const productsRef = collection(database, "products");

    // Create a query against the collection.
    let quer = query(productsRef, where("id", "==", id))


    quer.once('value').then(function(snapshot) {
    console.log(snapshot.val());
    return snapshot.val()
    });
}

export default get_product_by_id;
