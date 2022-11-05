import {getAllProducts} from '../../../firebase/firebaseGetProduct.js';


async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const list = await getAllProducts();
      res.status(201).json({message: 'success', list});
    }
  } catch (error) {
    console.log(error)
    res.json(error);
    res.status(405).end();
  }

}


export default handler;
