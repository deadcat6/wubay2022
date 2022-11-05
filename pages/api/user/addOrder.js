import {addOrder} from '../../../firebase/firebaseSetUser.js';


async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {userId, productId} = data;
    await addOrder(userId, productId);
    res.status(201).json({message: 'success'});
  }
}
export default handler;
