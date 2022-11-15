import { app, database } from './firebaseConfig';
import {collection, setDoc, addDoc, getDocs, getDoc, doc, query, where, updateDoc, getFirestore} from 'firebase/firestore';

async function update_product(email, fields, updates) {
    //const db = getFirestore(app)
    // email = "ismark.lu@gmail.com" //hard coded, remove once correct parameters are passed
    // fields = ["phone", "lastname"]
    // updates = ["802-923-6813", "Cafiero"]
   // const productQ = query(collection(db, "users"), where("email", "==", email));
   // const profileSnapshot = await getDocs(productQ);
    //console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
    //console.log(email,fields, updates)
    const db = getFirestore(app)
    //const quer = query(collection(db, "products"), where("id", "==", id));
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
    }
    return docSnap.data()


}

    let id = ""
    let profile = {}
    profileSnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        id = doc.id
        profile = doc.data()
    })
    //console.log("profile ---------------------------------")
    //console.log(profile)
    const docRef = await doc(db, "users", id);

    //const docRef = await doc(db, "users", id);

    //console.log(docRef)

    //let dict = {phone:profile["phone"], first_name: profile["firstname"], last_name: profile["lastname"],
    //    username: profile["username"], password:profile["password"], needProfile:false}
    // let dict = {phone:"802", first_name:"802", last_name: "802",
    //     username: "802", password:"802", needProfile:false, email:email}
    //console.log(fields)
    //console.log("fields <<<<<<<<<<<<<<<<<<<<<<<<")
    //console.log(updates)
    for(let i = 0; i < fields.length; i++) {
        profile[fields[i]] = updates[i]

        let j = 0
    }
    //console.log("new profile ----------------------------")
    //console.log(profile);

    //let ref = profile.ref.path
    const res = await setDoc(docRef, profile);
    //console.log(res)

}

export default update_product;
