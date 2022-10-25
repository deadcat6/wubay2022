import get_user_product from '../../firebase/get_user_product.js';
import get_profile from '../../firebase/get_profile.js';

async function handler(req, res){
    
        const data = req.body;
        const { email } = data;
        var products = {};
        const p_list = await get_user_product(email);
        products = JSON.stringify(p_list);



        const user_data = await get_profile(email);
        res.status(201).json({ message: 'get profile', products: products, user_data: user_data });
}

export default handler;