import {setProductPublish} from '../../../firebase/firebaseSetProduct.js';


async function handler(req, res) {
  if (req.method === 'POST') {

    const data = req.body;
    const { productId, published} = data;
     await setProductPublish(productId, published);
    res.status(201).json({message: 'inserted product into database'});
  }
}

export default handler;
