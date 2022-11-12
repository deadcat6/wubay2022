// import {newMessage} from '../../../firebase/firebaseChats';
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
import * as fs from "fs"
import {uploadImage} from "../../../firebase/firebaseUpload";
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  // form.uploadDir = "./";
  // form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log("handlerhandlerhandlerhandlerhandlerhandlerhandlerhandler")
    console.log(files.testFile);
    const srcToFile = (src) => fs.readFileSync(src);
    //
    console.log(srcToFile(files.testFile.filepath))
   uploadImage(srcToFile(files.testFile.filepath))
  });

};
