const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const SubCategoryModel = require('../models/subCategory');

exports.createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const subcategory = await SubCategoryModel.create({
    name: name,
    category: category,
    slug: slugify(name),
  });
  res.status(201).json({ data: subcategory });
});
