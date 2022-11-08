import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {app, database} from "./firebaseConfig";
//takes a string title
async function search_products_by_title(title) {
    //https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search

    //https://firebase.google.com/docs/firestore/query-data/queries
    const db = getFirestore(app)
    const quer = query(collection(db, "products"))

    const querySnapshot = await getDocs(quer);
    let products_info = []
    let products_id = []
    querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        products_info.push(doc.data())
        products_id.push(doc.id)

    })
    let search_match = []
    let search_match_ids = []
    for(let i = 0; i<products_info.length; i++){
        if(products_info[i].title.includes(title)){
            search_match.append(products_info[i])
            search_match_ids.append(products_id[i])
        }

    }

    return [search_match,search_match_ids]
}


export default search_products_by_title;
