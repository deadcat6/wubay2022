import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {app, database} from "./firebaseConfig";
//takes an array length 2, arr[0] is starting filter val, arr[1] is ending
async function filter_by_rating(rating_range) {
    //NOTE: on the site, the functionality of this feature is convoluted.
    //It would make more sense to display all products ABOVE a certain rating, also, it is  unclear if this is seller rating or product rating (like Ebay)
    //So, this function is just a placeholder
    let rating_start = rating_range[0]
    let rating_end = rating_range[1]


    //https://firebase.google.com/docs/firestore/query-data/queries
    const db = getFirestore(app)
    const quer = query(collection(db, "products"), where("rating", ">=", rating_start), where("rating", "<=", rating_end));
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


export default filter_by_rating;