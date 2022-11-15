
import {newChat} from '../../../firebase/firebaseChats';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {userId, sellerId} = data;

    const chatId = await newChat(userId, sellerId);
    res.status(201).json({message: 'success', chatId});
  }
}
export default handler;
