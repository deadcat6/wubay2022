import signup from '../../firebase/firebase_signup.js';


function handler(req, res){
    if (req.method === 'POST'){
        
        const data = req.body;
        
        const { email } = data;
        
        const user_exists = signup(email);
        //false = user added i think
        //console.log(user_exists);
        res.status(201).json({ message: 'inserted user into database', user_exists: user_exists });
    }
}

export default handler;