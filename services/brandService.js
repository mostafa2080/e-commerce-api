const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const BrandModel = require('../models/brandModel');

//@desc create new category
//@route /api/v1/categories
//@access private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await BrandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ Data: brand });
});

//@desc get all categories
//@route POST /api/v1/categories
//@access public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await BrandModel.find({}).skip(skip).limit(limit);
  if (!categories) {
    return new ApiError('No Brand found', 404);
  }
  res.status(200).json({ Results: categories.length, page, Data: categories });
});

//@desc get specific Brand by id
//@route get /api/v1/categories/:id
//@access public

exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findById(id);
  if (!brand) {
    // res.status(404).json({ msg: `No brand for this id ${id}` });
    return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

//@desc update specific brand by id
//@route PUT /api/v1/categories/:id
//@access private

//@desc update brand by brand id
//@desc /categories/:id

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await BrandModel.findByIdAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    // res.status(404).json({ msg: `No brand for this id ${id}` });
    return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

//@desc delete specific Brand by id

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findByIdAndDelete(id);
  if (!brand) {
    // res.status(404).json({ msg: `No Brand Found with this id ${id}` });
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }
  res.status(204).send();
});
