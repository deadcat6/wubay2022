import get_user_data from '../../firebase/get_user_data.js';
import get_profile from '../../firebase/get_profile.js';

async function handler(req, res){
    
        const data = req.body;
        const { email } = data;
        var products = {};
        const p_list = await get_user_data(email);
        products = JSON.stringify(p_list);



        const user_data = await get_profile(email);
        res.status(201).json({ message: 'got products', products: products, user_data: user_data });
    
}

export default handler;