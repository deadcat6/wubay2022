import get_product_info from '../../firebase/NAMEOFFILE.js';

async function handler(req, res){
    
        const data = req.body;
        const { pid } = data;

        const product_data = await get_product_info(pid);
        res.status(201).json({ message: 'get product info', product_data: product_data });
}

export default handler;