//get email given a username

import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {app, database} from "../firebase_config";

async function firebase_get_profile(email) {


    const db = getFirestore(app)
    const quer = query(collection(db, "users"), where("email", "==", email));

    const querySnapshot = await getDocs(quer);
    let id = ""
    let profile = {}
    querySnapshot.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data());
    id = doc.id
        profile = doc.data()
     })
    return profile


}


export default firebase_get_profile;
