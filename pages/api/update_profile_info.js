//need profile creation from database

import update_info from '../../firebase/update_profile.js';


function handler(req, res){
  if (req.method === 'POST'){

    const data = req.body;

    const { username, password, firstname, lastname, email, phone, rating, postedProducts, BuyerTransactions, sellerTransactions, usersChats } = data;
    var fields = ['username', 'password', 'firstname', 'lastname', 'email', 'phone', 'rating', 'postedProducts',
      'BuyerTransactions',
      'sellerTransactions',
      'usersChats'];
    var updates = {username, password, firstname, lastname, email, phone, rating, postedProducts, BuyerTransactions, sellerTransactions, usersChats}
    const ret = signup(email, fields, updates);
    console.log(ret);
    res.status(201).json({ message: 'inserted profile into database', username: username, worked: ret });
  }
}

export default handler;

