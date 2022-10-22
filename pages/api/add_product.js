import add_product from '../../firebase/firebase_add_product.js';


function handler(req, res){
    if (req.method === 'POST'){
        
        const data = req.body;
        const { name, description, imagePath, transactionType, price } = data;
        
        //console.log(p);
        
        var message = "inserted product";
        var add_return = '';
        let success = false;
        if (isNaN(price) == false && price > 0){
            add_return = add_product("DemoLister", price, name, description, imagePath, transactionType);
            success = true;
            //console.log('working');
        }
        else{
            message = 'please input a price that is a number greater than 0';
        }
        res.status(201).json({ message: message, success: success, item_name: name, return_val: add_return });
    }
}

export default handler;