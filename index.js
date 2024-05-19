import express from 'express';
import ProductController from './src/controllers/products.controller.js';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import validationMiddleware from './middleware/validation.middleware.js';
import { uploadFile } from './middleware/fileupload.middlleware.js';
import UserController from './src/controllers/user.controller.js';
const server = express();
const productController = new ProductController();
const userController = new UserController();


server.use(express.urlencoded({extended:true}));
server.set('view engine', 'ejs');

server.set('views',path.join(path.resolve(), 'src', 'views'));
server.use(express.static('public'));
server.use(expressEjsLayouts);

// server.use(express.static('src/views'));

server.get('/', productController.getProducts);
server.get('/new',productController.getFormData)
server.post('/',uploadFile.single('image-url'),validationMiddleware,productController.addNewProduct);
server.get('/updateproduct/:id',productController.getUpdateProductView);
server.post('/updateproduct', productController.postUpdateProduct);
server.post('/deleteproduct/:id',productController.deleteProduct);

server.get('/register',userController.getRegister);
server.get('/login',userController.getLogin);
server.post('/register',userController.postRegister);
server.post('/login',userController.postLogin);

const PORT = process.env.PORT || 3100;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
