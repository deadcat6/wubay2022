//need profile creation from database

import update_info from '../../../firebase/old/firebase_update_profile.js';
import firebase_update_profile from "../../../firebase/old/firebase_update_profile.js";


function handler(req, res){
  if (req.method === 'POST'){

    const data = req.body;

    const { username, password, firstname, lastname, email, phone, rating, postedProducts, BuyerTransactions, sellerTransactions, usersChats } = data;
    var fields = ['username', 'password', 'firstname', 'lastname', 'email', 'phone', 'needProfile'];
    var updates = [username, password, firstname, lastname, email, phone, false]

   // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    //console.log(data)
    const ret = firebase_update_profile(email, fields, updates);
    //console.log(ret);
    res.status(201).json({ message: 'inserted profile into database', username: username, worked: ret });
   // console.log("back to middleware")

  }
}

export default handler;

