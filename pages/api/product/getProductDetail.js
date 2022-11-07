import {getProductDetailPage} from '../../../firebase/firebaseGetProduct.js';


async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {productId} = data;
    //console.log(productId)
    const product = await getProductDetailPage(productId);
    res.status(201).json({message: 'success', product});
  }
}

export default handler;
