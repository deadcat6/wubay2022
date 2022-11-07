import {getMyProducts} from '../../../firebase/firebaseGetProduct.js';


async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {userId} = data;
    const myProducts = await getMyProducts(userId);
    res.status(201).json({message: 'success', myProducts});
  }
}

export default handler;
