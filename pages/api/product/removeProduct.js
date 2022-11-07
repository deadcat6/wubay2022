import {removeProduct} from '../../../firebase/firebaseSetProduct.js';


async function handler(req, res) {
  if (req.method === 'POST') {

    const data = req.body;
    const {productId} = data;
    await removeProduct(productId);
    res.status(201).json({message: 'remove product from database'});
  }
}

export default handler;
