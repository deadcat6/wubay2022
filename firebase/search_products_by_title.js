import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {app, database} from "./firebaseConfig";
//takes a string title
async function search_products_by_title(title) {
    //https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search

    //https://firebase.google.com/docs/firestore/query-data/queries
    const db = getFirestore(app)
    //const quer = query(collection(db, "products"), where("rating", ">=", rating_start), where("rating", "<=", rating_end));
    // const q1 = query(citiesRef, where("state", ">=", "CA"), where("state", "<=", "IN")); (firestore online example)
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


export default search_products_by_title;