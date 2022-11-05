import {getAllProducts} from '../../../firebase/firebaseGetProduct.js';


async function handler(req, res) {
  if (req.method === 'POST') {
    //const data = req.body;
    const list = await getAllProducts(userId);
    res.status(201).json({message: 'success', list});
  }
}

export default handler;
