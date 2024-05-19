import path from 'path'
import ProductModel from '../models/products.model.js';
import { name } from 'ejs';

export default class ProductController{

getProducts(req,res){
    let products = ProductModel.get();

     res.render('products',{products});
    // console.log(products);
    // return res.sendFile(path.join(path.resolve(), 'src', 'views', 'products.html'));
}

getFormData(req,res){
res.render('new-product',{
    errorMessage:null
});
}

addNewProduct(req,res){
let products = ProductModel.get();
ProductModel.add(products.length+1,req.body['product-name'],req.body['product-description'], req.body.price,'images/'+req.file.filename);

res.render('products',{products})
}

getUpdateProductView(req,res){

    const id = req.params.id;
    console.log('id:-',id)
    const productFound = ProductModel.getById(id);
    console.log(productFound);
    if(productFound){
        res.render('update-product',{product:productFound});
    }
    else{
        res.send('Product Not Found');
    }
}

postUpdateProduct(req,res){
    ProductModel.updateProduct(req.body);
    let products = ProductModel.get();
    res.render('products',{products});
}

deleteProduct(req,res){
   const id = req.params.id;
   ProductModel.deleteProduct(id);
   let products = ProductModel.get();
   res.render('products',{products});

}

}