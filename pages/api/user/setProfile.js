import {setUserProfile} from '../../../firebase/firebaseSetUser.js';


async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {userId, profile} = data;
    await setUserProfile(userId, profile);
    res.status(201).json({message: 'success'});
  }
}

export default handler;
