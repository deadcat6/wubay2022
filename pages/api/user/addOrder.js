import {addOrder} from '../../../firebase/firebaseSetUser.js';
import {setTransaction} from "../../../firebase/firebaseSetProduct";
import {newChat} from '../../../firebase/firebaseChats';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {userId, sellerId, productId} = data;
    await addOrder(userId, productId);
    await setTransaction("Pending Payment",productId, userId)
    await newChat(userId, sellerId);
    res.status(201).json({message: 'success'});
  }
}
export default handler;
