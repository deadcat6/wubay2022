import {newMessage} from '../../../firebase/firebaseChats';
import * as fs from "fs"
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const srcToFile = (src) => fs.readFileSync(src);
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    console.log("handlerhandlerhandlerhandlerhandlerhandlerhandlerhandler")
    console.log(fields, files);
    const {imageFile} = files;
    const {chatId, myId, text,} = fields;
    let img;
    if (imageFile) {
      img = srcToFile(imageFile.filepath);
    }
    console.log(chatId, myId, text);
    await newMessage(chatId, myId, img, text);
    res.status(201).json({message: 'success'});
  });

};

//
// async function handler(req, res) {
//   if (req.method === 'POST') {
//     const data = req.body;
//     const {chatId, myId, imgUrl, text} = data;
//     console.log("handlerhandlerhandlerhandlerhandlerhandlerhandlerhandler")
//
//     console.log(chatId, myId, imgUrl, text)
//     await newMessage(chatId, myId, imgUrl, text);
//     res.status(201).json({message: 'success'});
//   }
// }

//export default handler;