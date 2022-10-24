import { app, database } from './firebaseConfig';
import {collection, addDoc, getDocs, getDoc, doc, query, where} from 'firebase/firestore';

async function update_info(username, fields, updates) {

    //function writeUserData(userId, name, email, imageUrl) {
    //   const db = getDatabase();
    //   set(ref(db, 'users/' + userId), {
    //     username: name,
    //     email: email,
    //     profile_picture : imageUrl
    //   });
    // }

    const productsRef = collection(database, "users");
    let first_name = ""
    let last_name = ""
    let password = ""
    let phone = ""
    let dict = new Object()

//Populate data
    dict["id"] = 123
    dict["name"] = "Anj"
    dict["age"] = 28
    dict["registered"] = true

    // Create a query against the collection.
    //fields and updates must be same length and order
    return query(productsRef, where("username", "==", username))
    for(let i = 0; i<fields.length(); i++){

    }

    const db = collection(database, 'users');
    const userSnapshot = await getDocs(db);
    const userList = userSnapshot.docs.map(doc => doc.data());

    let logged_in = false

    for(let i = 0; i<userList.length; i++){
        //console.log(userList[i]['username'])
        if(username === userList[i]['username'] && password === userList[i]['password']){
            logged_in = true
        }
    }

    console.log("login is " + logged_in)
    return logged_in
 }
 export default update_info;