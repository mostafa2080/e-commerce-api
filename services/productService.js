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
  //1)filtering the query parameters
  const queryStringObject = { ...req.query };
  const excludedFields = ['page', 'limit', 'sort', 'fields'];
  excludedFields.forEach((el) => delete queryStringObject[el]);
  //filter result using [gte, lte , gt, lt]
  const queryString = JSON.stringify(queryStringObject).replace(
    /\b(gte|lte|gt|lt)\b/g,
    (match) => `$${match}`
  );
  //2)pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;

  //query
  let mongooseQuery = ProductModel.find(JSON.parse(queryString))
    .skip(skip)
    .limit(limit)
    .populate({ path: 'category', select: 'name -_id' });

  //3)sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    console.log(sortBy);
    mongooseQuery = mongooseQuery.sort(sortBy);
  } else {
    mongooseQuery = mongooseQuery.sort('-createdAt');
  }

  //4)fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    mongooseQuery = mongooseQuery.select(fields);
  } else {
    mongooseQuery = mongooseQuery.select('-__v');
  }

  //5)search
  if (req.query.keyword) {
    const query = {};
    query.$or = [
      { title: { $regex: req.query.keyword, $options: 'i' } },
      { description: { $regex: req.query.keyword, $options: 'i' } },
    ];
    console.log(query);
    console.log(req.query.keyword);
    mongooseQuery = mongooseQuery.find(query);
  }

  //execute the query
  const products = await mongooseQuery;
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
  if (req.body.title) {
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
