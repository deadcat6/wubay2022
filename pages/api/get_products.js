import get_products from '../../firebase/firebase_products.js';


async function handler(req, res){
    
        var products = {};
        const list = await get_products();
        products = JSON.stringify(list);
        res.status(201).json({ message: 'got products', products: products });
    
}

export default handler;