import {setTransactionState} from "../../../firebase/firebaseSetProduct";
import {removeMyOrder} from "../../../firebase/firebaseSetUser";

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {userId, productId} = data;
    await removeMyOrder(userId, productId);
    await setTransactionState('Published',productId)
    res.status(201).json({message: 'success'});
  }
}
export default handler;
