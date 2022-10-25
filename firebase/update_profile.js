import { app, database } from './firebaseConfig';
import {collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, getFirestore} from 'firebase/firestore';

async function update_profile(email, fields, updates) {
    const db = getFirestore(app)
    const profileQ = query(collection(db, "users"), where("email", "==", email));
    const profile = await getDocs(profileQ);
    console.log(profile)
    let products_info = []
    let products_id = []
    profile.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    products_info.push(doc.data())
        products_id.push(doc.id)

     })
    console.log(products_info)

   // const profileRef = collection(database, "users");
   // let profile = query(profileRef, where("email", "==", email))

    let dict = {phone:profile["phone"], first_name: profile["firstname"], last_name: profile["lastname"],
        username: profile["username"], password:profile["password"], needProfile:false}

    for(let i = 0; i < fields.length; i++) {
        dict[fields[i]] = updates[i]
    }

    let ref = profile.ref.path
    const res = await updateDoc(ref, dict);
    console.log(res)

}

export default update_profile;