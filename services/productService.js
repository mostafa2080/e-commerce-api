const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ProductModel = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');
const handlerFactory = require('./handlersFactory');

//@desc create new product
//@route POST /api/v1/products
//@access private
exports.createProduct = handlerFactory.createOne(ProductModel);

//@desc get all products
//@route POST /api/v1/products
//@access public
exports.getProducts = asyncHandler(async (req, res) => {
  //prepare query
  const documentCount = await ProductModel.countDocuments();
  const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
    .sort()
    .filter()
    .search('Products')
    .limitFields()
    .paginate(documentCount);

  //execute the query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;
  res
    .status(200)
    .json({ Results: products.length, paginationResult, Data: products });
});

//@desc get specific product by id
//@route get /api/v1/products/:id
//@access public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id).populate({
    path: 'category',
    select: 'name -_id',
  });
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

//@desc update specific product by id
//@route PUT /api/v1/products/:id
//@access private
exports.updateProduct = handlerFactory.updateOne(ProductModel);
//@desc delete specific product by id
//@route DELETE /api/v1/products/:id
//@acess private
exports.deleteProduct = handlerFactory.deleteOne(ProductModel);
