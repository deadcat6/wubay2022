//need profile creation from database

import signup from '../../firebase/firebase_signup.js';


function handler(req, res){
    if (req.method === 'POST'){
        
        const data = req.body;
        
        const { username, password, firstname, lastname, email, phone } = data;
        
        const user_exists = signup(username, password, firstname, lastname, email, phone);
        //console.log(user_exists);
        res.status(201).json({ message: 'inserted profile into database', username: username, exists: user_exists });
    }
}

export default handler;