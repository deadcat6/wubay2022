import {newChat} from '../../../firebase/firebaseChats';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {userId, sellerId} = data;

    await newChat(userId, sellerId);
    res.status(201).json({message: 'success'});
  }
}
export default handler;
