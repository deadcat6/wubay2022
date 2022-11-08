import {getMyOrders} from '../../../firebase/firebaseGetProduct.js';


async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {userId} = data;
    const myOrders = await getMyOrders(userId);
    console.log(myOrders)

    res.status(201).json({message: 'success', myOrders});
  }
}

export default handler;
