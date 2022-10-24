import get_user_data from '../../firebase/get_user_data.js';


async function handler(req, res){
    
        const data = req.body;
        const { email } = data;
        var products = {};
        const list = await get_user_data(email);
        products = JSON.stringify(list);



        var user_data = { email };
        res.status(201).json({ message: 'got products', products: products, user_data: user_data });
    
}

export default handler;