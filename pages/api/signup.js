import signup from '../../firebase/firebase_signup.js';


function handler(req, res){
    if (req.method === 'POST'){
        
        const data = req.body;
        
        const { email } = data;
        
        const oldUser = signup(email);
        //false = user added i think
        //console.log(user_exists);
        res.status(201).json({ message: 'inserted user into database', oldUser: oldUser });
    }
}

export default handler;