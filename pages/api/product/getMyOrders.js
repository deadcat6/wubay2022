import {getMyOrders} from '../../../firebase/firebaseGetProduct.js';


async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {userId} = data;
    const myOrders = await getMyOrders(userId);
    //console.log(myOrders)

    res.status(201).json({message: 'success', myOrders});
  }
}
const categroyList = [
  {
    title: "All Categories",
  },
  {
    title: "Textbook",
  },
  {
    title: "Grocery",
  },
  {
    title: "Clothing & Beauty",
  },
  {
    title: "Electronic & Entertainment",
  },
  {
    title: "Furniture & Household",
  },
  {
    title: "Office & School Supplies",
  },
  {
    title: "Other",
  }
];
export default handler;
