import firebase_get_user_product from '../../../firebase/old/firebase_get_user_product.js';
import firebase_get_profile from '../../../firebase/old/firebase_get_profile.js';

async function handler(req, res){
    
        const data = req.body;
        const { email } = data;
        var products = {};
        const p_list = await firebase_get_user_product(email);
        products = JSON.stringify(p_list);



        const user_data = await firebase_get_profile(email);
        res.status(201).json({ message: 'get profile', products: products, user_data: user_data });
}

export default handler;