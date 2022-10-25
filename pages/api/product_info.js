import get_product_by_id from '../../firebase/get_product_by_id.js';

async function handler(req, res){
    
        const data = req.body;
        const { pid } = data;
        //console.log("---------------------")
        const product_data = await get_product_by_id(pid);
        //console.log(product_data)

        res.status(201).json({ message: 'get product info', product_data: product_data });
}

export default handler;