const BrandModel = require('../models/brandModel');
const handlerFactory = require('./handlersFactory');

//@desc create new brand
//@route POST /api/v1/brands
//@access private
exports.createBrand = handlerFactory.createOne(BrandModel);

//@desc get all brands
//@route GET /api/v1/brands
//@access public
exports.getCategories = handlerFactory.getAll(BrandModel);
//@desc get specific Brand by id
//@route GET /api/v1/brands/:id
//@access public
exports.getBrand = handlerFactory.getOne(BrandModel);

//@desc update specific brand by id
//@route PUT /api/v1/brands/:id
//@access private
exports.updateBrand = handlerFactory.updateOne(BrandModel);

//@desc delete specific Brand by id
//@route Delete /api/v1/brands/:id
//@access private
exports.deleteBrand = handlerFactory.deleteOne(BrandModel);
