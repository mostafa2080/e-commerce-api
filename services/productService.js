const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ProductModel = require('../models/productModel');

//@desc create new product
//@route /api/v1/products
//@access private
exports.createProduct = asyncHandler(async (req, res) => {
  const {name} = req.body;
  const product = await ProductModel.create({ name, slug: slugify(name) });
  res.status(201).json({ Data: product });
});

//@desc get all products
//@route POST /api/v1/products
//@access public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await ProductModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ Results: products.length, page, Data: products });
});

//@desc get specific product by id
//@route get /api/v1/products/:id
//@access public

exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  if (!product) {
    // res.status(404).json({ msg: `No product for this id ${id}` });
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

//@desc update specific product by id
//@route PUT /api/v1/products/:id
//@access private

//@desc update product by product id
//@desc /products/:id

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await ProductModel.findByIdAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!product) {
    // res.status(404).json({ msg: `No product for this id ${id}` });
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});


//@desc delete specific product by id

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
    // res.status(404).json({ msg: `No product Found with this id ${id}` });
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(204).send();
});
