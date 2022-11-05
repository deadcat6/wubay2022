import {newProduct} from '../../../firebase/firebaseNewProduct.js';


async function handler(req, res) {
  if (req.method === 'POST') {

    const data = req.body;
    const {userId, userEmail, product} = data;
    await newProduct(userId, userEmail, product);
    res.status(201).json({message: 'inserted product into database'});
  }
}

export default handler;
