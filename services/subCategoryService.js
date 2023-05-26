const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const SubCategoryModel = require('../models/subCategory');

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const subcategory = await SubCategoryModel.create({
    name: name,
    category: category,
    slug: slugify(name),
  });
  res.status(201).json({ data: subcategory });
});

exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategoryModel.findById(id);
  //   .populate({
  //     path: 'category',
  //     select: 'name -_id',
  //   });

  if (!subcategory) {
    return ApiError(404, 'Subcategory not found');
  }
  res.status(200).json({ data: subcategory });
});

exports.createFilterObj = (req ,res , next)=> {
  let filteredObj = {};
  if (req.params.categoryId) {
    filteredObj = { category: req.params.categoryId };
    req.filterObj = filteredObj;
  }
}


exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subcategories = await SubCategoryModel.find(req.filterObj)
    .skip(skip)
    .limit(limit);
  // .populate({ path: 'category', select: 'name -_id' });

  console.log(req.params);

  if (!subcategories) {
    return ApiError(404, 'No Subcategories Exist in DB');
  }
  res
    .status(200)
    .json({ Results: subcategories.length, page, Data: subcategories });
});

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subcategory = await SubCategoryModel.findOneAndUpdate(
    { _id: id },
    {
      name,
      category,
      slug: slugify(name),
    },
    { new: true }
  );
  if (!subcategory) {
    return next(ApiError(404, 'Subcategory not found'));
  }
  res.status(200).json({ data: subcategory });
});

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategoryModel.findByIdAndDelete(id);
  if (!subcategory) {
    return next(ApiError(404, 'Subcategory not found'));
  }
  res.status(204).send();
});
