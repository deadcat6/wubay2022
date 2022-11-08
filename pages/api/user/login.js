import FirebaseLogin from '../../../firebase/firebaseLogin.js';


async function handler(req, res) {
  if (req.method === 'POST') {

    const data = req.body;
    const {user} = data;
    const userData = await FirebaseLogin(user);

    res.status(201).json({message: 'inserted user into database', userData: userData});
  }
}

export default handler;
