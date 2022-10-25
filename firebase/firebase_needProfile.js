import { app, database } from './firebaseConfig';
import { collection, addDoc, getDocs, getDoc , doc} from 'firebase/firestore';
 
async function checkProfile(email) {
   const db = collection(database, "users");
   const userSnapshot = await getDocs(db);
   const userList = userSnapshot.docs.map(doc => doc.data());
   let needProfile = true;
   let userExists = false;

   for(let i = 0; i < userList.length; i++){

       //console.log(userList[i]['username'])
       if(email === userList[i]['email']){

         needProfile = userList[i]['needProfile'];
         userExists = true;

       }
   }
   // //'username', 'password', 'firstname', 'lastname', 'email', 'phone', 'rating', 'postedProducts',
    //        //       'BuyerTransactions',
    //        //       'sellerTransactions',
    //        //       'usersChats'
   if(!userExists){
        addDoc(db, {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            phone: "",
            rating: "",
            postedProducts: "",
            BuyerTransactions: "",
            sellerTransactions: "",
            userChats: "",
            email: email,
            needProfile: true
       })
   }
  //  console.log("MMMMMMMMMMHGUDWVAUYDVUYWVDYUAVDUYAVDYWDYUVWADUY")
  // console.log(needProfile)
   return needProfile
}
 
// async function login(username, password) {
//    const db = collection(database, 'users');
//    const userSnapshot = await getDocs(db);
//    const userList = userSnapshot.docs.map(doc => doc.data());
//    //console.log(userList)
//    let logged_in = false
//    //console.log(username)
//
//    for(let i = 0; i<userList.length; i++){
//
//        //console.log(userList[i]['username'])
//        if(username === userList[i]['username'] && password === userList[i]['password']){
//            logged_in = true
//        }
//    }
//    return logged_in
// }
//

export default checkProfile;

// signup("michaelcafiero", "cafiero.i@wustl.edu") //your data here
  // login()