const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const CategoryModel = require('../models/categoryModel');
const ApiFeatures = require('../utils/apiFeatures');
const handlerFactory = require('./handlersFactory');

//@desc create new category
//@route POST /api/v1/categories
//@access private
exports.createCategory = handlerFactory.createOne(CategoryModel);

//@desc get all categories
//@route POST /api/v1/categories
//@access public
exports.getCategories = asyncHandler(async (req, res) => {
  //prepare query
  const documentCount = await CategoryModel.countDocuments();
  const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
    .sort()
    .filter()
    .search()
    .limitFields()
    .paginate(documentCount);

  //execute the query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const categories = await mongooseQuery;
  res
    .status(200)
    .json({ Results: categories.length, paginationResult, Data: categories });
});

//@desc get specific category by id
//@route get /api/v1/categories/:id
//@access public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    return next(new ApiError(`No Category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

//@desc update specific category by id
//@route PUT /api/v1/categories/:id
//@access private
exports.updateCategory = handlerFactory.updateOne(CategoryModel);

//@desc delete specific category by id
//@route DELETE /api/v1/categories/:id
//@access private
exports.deleteCategory = handlerFactory.deleteOne(CategoryModel);
