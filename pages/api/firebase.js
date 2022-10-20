import { app, database } from './firebaseConfig';
import { collection, addDoc, getDocs, getDoc , doc} from 'firebase/firestore';
 
async function signup(username, email) {
   const db = collection(database, 'users');
   const userSnapshot = await getDocs(db);
   const userList = userSnapshot.docs.map(doc => doc.data());
   console.log(userList)
   let user_exists = false
   console.log(username)
 
   for(let i = 0; i<userList.length; i++){
 
       console.log(userList[i]['username'])
       if(username === userList[i]['username']){
           user_exists = true
       }
   console.log(user_exists)
   }
   if(!user_exists){
       addDoc(db, {
          username: username
        })
 
   }
   return !user_exists
}
 
async function login(username, password) {
   const db = collection(database, 'users');
   const userSnapshot = await getDocs(db);
   const userList = userSnapshot.docs.map(doc => doc.data());
   console.log(userList)
   let logged_in = false
   console.log(username)
 
   for(let i = 0; i<userList.length; i++){
 
       console.log(userList[i]['username'])
       if(username === userList[i]['username'] && password === userList[i]['password']){
           logged_in = true
       }
   }
   return logged_in
}
 
// signup("michaelcafiero", "cafiero.i@wustl.edu") //your data here
  // login()