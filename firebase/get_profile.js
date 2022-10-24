//get email given a username

import {collection, query, where} from "firebase/firestore";
import {database} from "./firebaseConfig";

async function get_profile(email) {

    // Create a reference to the cities collection

    //const db = collection(database, "products");
    const profileRef = collection(database, "users");

    // Create a query against the collection.

    return query(profileRef, where("email", "==", email))

}


export default get_profile;
