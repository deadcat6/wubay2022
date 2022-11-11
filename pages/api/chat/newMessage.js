import {newMessage} from '../../../firebase/firebaseChats';

async function handler(req, res) {
  console.log("jkdwabdawbdkhjaw")
  if (req.method === 'POST') {
    const data = req.body;
    const {chatId, myId, img, text} = data;
    console.log("handlerhandlerhandlerhandlerhandlerhandler")
    console.log(img)
    console.log("handlerhandlerhandlerhandlerhandlerhandler")

    await newMessage(chatId, myId, img, text);
    res.status(201).json({message: 'success'});
  }
}
export default handler;
