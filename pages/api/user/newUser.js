import firebaseNewUser from '../../../firebase/firebaseNewUser.js';


async function handler(req, res) {
  if (req.method === 'POST') {

    const data = req.body;
    const {user} = data;
    const needProfile = await firebaseNewUser(user);
    res.status(201).json({message: 'inserted user into database', needProfile: needProfile});
  }
}

export default handler;
