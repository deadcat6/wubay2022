import {setProduct} from '../../../firebase/firebaseSetProduct.js';


async function handler(req, res) {
  if (req.method === 'POST') {

    const data = req.body;
    const {product, productId} = data;
    //console.log(product, productId)
    const id = await setProduct(product, productId);
    res.status(201).json({message: 'inserted product into database'});
  }
}

export default handler;
