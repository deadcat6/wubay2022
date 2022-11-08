import {removeProduct} from '../../../firebase/firebaseSetProduct';
import {removeMyProduct} from '../../../firebase/firebaseSetUser';

async function handler(req, res) {
  if (req.method === 'POST') {

    const data = req.body;
    const {userId, productId} = data;
    await removeProduct(productId);
    await removeMyProduct(userId, productId);
    res.status(201).json({message: 'remove product from database'});
  }
}

export default handler;
