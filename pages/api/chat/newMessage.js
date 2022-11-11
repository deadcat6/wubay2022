import {newMessage} from '../../../firebase/firebaseChats';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {chatId, myId, img, text} = data;

    await newMessage(chatId, myId, img, text);
    res.status(201).json({message: 'success'});
  }
}
export default handler;
