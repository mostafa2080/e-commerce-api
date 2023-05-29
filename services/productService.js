const ProductModel = require('../models/productModel');
const handlerFactory = require('./handlersFactory');

//@desc create new product
//@route POST /api/v1/products
//@access private
exports.createProduct = handlerFactory.createOne(ProductModel);

//@desc get all products
//@route POST /api/v1/products
//@access public
exports.getProducts = handlerFactory.getAll(ProductModel, 'Products');

//@desc get specific product by id
//@route get /api/v1/products/:id
//@access public
exports.getProduct = handlerFactory.getOne(ProductModel);

//@desc update specific product by id
//@route PUT /api/v1/products/:id
//@access private
exports.updateProduct = handlerFactory.updateOne(ProductModel);
//@desc delete specific product by id
//@route DELETE /api/v1/products/:id
//@acess private
exports.deleteProduct = handlerFactory.deleteOne(ProductModel);
