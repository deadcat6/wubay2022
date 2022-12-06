import {setRating} from '../../../firebase/firebaseSetUser.js';
import {setProductRated} from "../../../firebase/firebaseSetProduct";


async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {userId, productId, rating} = data;
    await setProductRated(rating, productId);
    //console.log(userId, profile);
    await setRating(userId, rating);
    res.status(201).json({message: 'success'});
  }
}

export default handler;
