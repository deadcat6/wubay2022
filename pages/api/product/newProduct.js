import * as fs from "fs"
import formidable from 'formidable';
import {newProduct} from "../../../firebase/firebaseSetProduct";
import {addProduct} from '../../../firebase/firebaseSetUser.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const srcToFile = (src) => fs.readFileSync(src);
  const form = new formidable.IncomingForm();
  let imageArray = [];
  form.on('file', (name, file) => {
    //console.log(name, file);
    imageArray.push(srcToFile(file.filepath));
  });

  form.parse(req, async (err, fields, files) => {
    // console.log(fields, files);
    const { userId, userEmail, title, description, category, paymentMethod, price} = fields;
    const ProductInfo = {userId, userEmail, title, description, category, paymentMethod, price};

    const id = await newProduct(ProductInfo, imageArray);
    await addProduct(userId, id);
    res.status(201).json({message: 'inserted product into database'});
  });

};

