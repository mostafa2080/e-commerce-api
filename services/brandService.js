const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const BrandModel = require('../models/brandModel');
const handlerFactory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

exports.uploadBrandImage = uploadSingleImage('image');

//image processing
exports.processingImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`./uploads/brands/${filename}`);
  req.body.image = filename;

  next();
});

//@desc create new brand
//@route POST /api/v1/brands
//@access private
exports.createBrand = handlerFactory.createOne(BrandModel);

//@desc get all brands
//@route GET /api/v1/brands
//@access public
exports.getBrands = handlerFactory.getAll(BrandModel);
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
