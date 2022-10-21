import login from './firebase_login.js';


function handler(req, res){
    if (req.method === 'POST'){
        
        const data = req.body;
        
        const { username, password } = data;
        
        
        //console.log(username);
        const login_match = login(username, password);
        
        res.status(201).json({ message: 'inserted user into database', username: username, match: login_match });
    }
}

export default handler;