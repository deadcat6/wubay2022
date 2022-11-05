import { app, database } from '../firebase_config';
import { collection, addDoc, getDocs, getDoc , doc} from 'firebase/firestore';

async function login(username, password) {
    const db = collection(database, 'users');
    const userSnapshot = await getDocs(db);
    const userList = userSnapshot.docs.map(doc => doc.data());
    //console.log(userList)
    let logged_in = false
    //console.log(username)


    for(let i = 0; i<userList.length; i++){
        //console.log(userList[i]['username'])
        if(username === userList[i]['username'] && password === userList[i]['password']){
            logged_in = true
        }
    }
    //console.log("login is " + logged_in)
    return logged_in
 }

 export default login;