import {newProduct} from '../../../firebase/firebaseNewProduct.js';
import {addProduct} from '../../../firebase/firebaseSetUser.js';


async function handler(req, res) {
  if (req.method === 'POST') {

    const data = req.body;
    const {product} = data;
    const id = await newProduct(product);
    await addProduct(product.userId, id)
    res.status(201).json({message: 'inserted product into database'});
  }
}

export default handler;
