import signup from '../../firebase/firebase_signup.js';


function handler(req, res){
    if (req.method === 'POST'){
        
        const data = req.body;
        
        const { email } = data;
        const needProfile = signup(email);
        console.log(needProfile);

        //false = user added i think
        res.status(201).json({ message: 'inserted user into database', needProfile: needProfile });
    }
}

export default handler;