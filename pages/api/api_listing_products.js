import firebase_get_products from '../../firebase/firebase_listing_products.js';


async function handler(req, res){
    
        var products = {};
        const list = await firebase_get_products();
        products = JSON.stringify(list);
        res.status(201).json({ message: 'got products', products: list });
    
}

export default handler;