const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const BrandModel = require('../models/brandModel');
const ApiFeatures = require('../utils/apiFeatures');

//@desc create new brand
//@route POST /api/v1/brands
//@access private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await BrandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ Data: brand });
});

//@desc get all brands
//@route GET /api/v1/brands
//@access public
exports.getCategories = asyncHandler(async (req, res) => {
  //prepare query
  const documentCount = await BrandModel.countDocuments();
  const apiFeatures = new ApiFeatures(BrandModel.find(), req.query)
    .sort()
    .filter()
    .search()
    .limitFields()
    .paginate(documentCount);

  //execute the query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const brands = await mongooseQuery;
  res
    .status(200)
    .json({ Results: brands.length, paginationResult, Data: brands });
});

//@desc get specific Brand by id
//@route GET /api/v1/brands/:id
//@access public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findById(id);
  if (!brand) {
    return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

//@desc update specific brand by id
//@route PUT /api/v1/brands/:id
//@access private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await BrandModel.findByIdAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

//@desc delete specific Brand by id
//@route Delete /api/v1/brands/:id
//@access private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }
  res.status(204).send();
});
