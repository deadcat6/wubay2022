import {setProductRated, setTransactionState} from "../../../firebase/firebaseSetProduct";
import {removeMyOrder} from "../../../firebase/firebaseSetUser";

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {buyerId, state, productId} = data;
    if (state === 'Published') {
      await setProductRated(-1, productId);
      await removeMyOrder(buyerId, productId);
    }
    await setTransactionState(state,productId)
    res.status(201).json({message: 'success'});
  }
}
export default handler;
