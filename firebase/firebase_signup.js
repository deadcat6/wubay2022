import { app, database } from './firebaseConfig';
import { collection, addDoc, getDocs, getDoc , doc} from 'firebase/firestore';
 
async function signup(email) {
   const db = collection(database, "users");
   const userSnapshot = await getDocs(db);
   const userList = userSnapshot.docs.map(doc => doc.data());
   let needProfile = true;
   let userExists = false;

   for(let i = 0; i<userList.length; i++){

       //console.log(userList[i]['username'])
       if(email === userList[i]['email']){
         needProfile = userList[i]['needProfile'];
         userExists = true;
       }
   }
   
   if(!userExists){
        addDoc(db, {
          email: email,
          needProfile: true,
       })
   }
   return needProfile
}
 
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
   return logged_in
}
 

export default signup;

// signup("michaelcafiero", "cafiero.i@wustl.edu") //your data here
  // login()