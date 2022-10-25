import { app, database } from './firebaseConfig';
import {collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc} from 'firebase/firestore';

async function update_profile(email, fields, updates) {

    const profileRef = collection(database, "users");
    let profile = query(profileRef, where("email", "==", email))

    let dict = {phone:profile["phone"], first_name: profile["firstname"], last_name: profile["lastname"],
        username: profile["username"], password:profile["password"], needProfile:false}

    for(let i = 0; i < fields.length; i++) {
        dict[fields[i]] = updates[i]
    }


    const res = await updateDoc(profileRef, dict);
    console.log(res)

}

export default update_profile;