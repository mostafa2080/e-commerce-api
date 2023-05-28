const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ProductModel = require('../models/productModel');

//@desc create new product
//@route /api/v1/products
//@access private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await ProductModel.create(req.body);
  res.status(201).json({ Data: product });
});

//@desc get all products
//@route POST /api/v1/products
//@access public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await ProductModel.find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: 'category', select: 'name -_id' });
  res.status(200).json({ Results: products.length, page, Data: products });
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
    // res.status(404).json({ msg: `No product for this id ${id}` });
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

//@desc update specific product by id
//@route PUT /api/v1/products/:id
//@access private

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if(req.body.title){
    req.body.slug = slugify(req.body.title);
  }
  const product = await ProductModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    // res.status(404).json({ msg: `No product for this id ${id}` });
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

//@desc delete specific product by id
//@route delete /api/v1/products/:id
//@acess private

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
    // res.status(404).json({ msg: `No product Found with this id ${id}` });
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(204).send();
});
