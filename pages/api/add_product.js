import add_product from '../../firebase/firebase_add_product.js';


function handler(req, res){
    if (req.method === 'POST'){
        
        const data = req.body;
        const { name, description, imagePath, transactionType, price } = data;
        const p = add_product("DemoLister", price, name, description, imagePath, transactionType);
        //console.log(p);
        res.status(201).json({ message: 'inserted user into database', item_name: name, p: p });
    }
}

export default handler;