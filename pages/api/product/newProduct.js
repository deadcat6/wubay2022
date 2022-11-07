import {newProduct} from '../../../firebase/firebaseSetProduct.js';
import {addProduct} from '../../../firebase/firebaseSetUser.js';


async function handler(req, res) {
  if (req.method === 'POST') {

    const data = req.body;
    const {product} = data;
    //console.log(product)
    const id = await newProduct(product);
    await addProduct(product.userId, id)
    res.status(201).json({message: 'inserted product into database'});
  }
}

export default handler;
