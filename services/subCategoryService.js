const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const SubCategoryModel = require('../models/subCategoryModel');
const ApiFeatures = require('../utils/apiFeatures');
const handlerFactory = require('./handlersFactory');
const subCategoryModel = require('../models/subCategoryModel');

//setting categoryId from params in case it didn't exist in body
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

//@desc create new subcategory
//@route POST /api/v1/subcategories
//@access private
exports.createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const subcategory = await SubCategoryModel.create({
    name: name,
    category: category,
    slug: slugify(name),
  });
  res.status(201).json({ data: subcategory });
});

//@desc get specific category by id
//@route get /api/v1/categories/:id
//@access public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategoryModel.findById(id);
  if (!subcategory) {
    return ApiError(404, 'Subcategory not found');
  }
  res.status(200).json({ data: subcategory });
});

//filtering
exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) {
    filterObj = { category: req.params.categoryId };
    req.filterObj = filterObj;
  }
  next();
};
//@desc get all subcategories
//@route POST /api/v1/subcategories
//@access public
exports.getSubCategories = asyncHandler(async (req, res) => {
  //prepare query
  const documentCount = await SubCategoryModel.countDocuments();
  const apiFeatures = new ApiFeatures(SubCategoryModel.find(), req.query)
    .sort()
    .filter()
    .search()
    .limitFields()
    .paginate(documentCount);

  //execute the query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const subcategories = await mongooseQuery;
  res.status(200).json({
    Results: subcategories.length,
    paginationResult,
    Data: subcategories,
  });
});

//@desc update specific subcategory by id
//@route PUT /api/v1/categories/:id
//@access private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const subcategory = await subCategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!subcategory) {
    return next(new ApiError(404, 'Subcategory not found'));
  }
  res.status(200).json({ data: subcategory });
});

//@desc delete specific subcategory by id
//@route DELETE /api/v1/subcategories/:id
//@access private
exports.deleteSubCategory = handlerFactory.deleteOne(SubCategoryModel);
