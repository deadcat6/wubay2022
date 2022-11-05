import {getFullUser} from '../../../firebase/firebaseGetUser.js';


async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {userId} = data;
    const user = await getFullUser(userId);
    res.status(201).json({message: 'success', user});
  }
}

export default handler;
