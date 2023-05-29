const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const CategoryModel = require('../models/categoryModel');
const handlerFactory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

//upload single image
exports.uploadCategoryImage = uploadSingleImage('image');

//image processing
exports.processingImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`./uploads/categories/${filename}`);
  req.body.image = filename;

  next();
});

//@desc create new category
//@route POST /api/v1/categories
//@access private
exports.createCategory = handlerFactory.createOne(CategoryModel);

//@desc get all categories
//@route POST /api/v1/categories
//@access public
exports.getCategories = handlerFactory.getAll(CategoryModel);

//@desc get specific category by id
//@route get /api/v1/categories/:id
//@access public
exports.getCategory = handlerFactory.getOne(CategoryModel);
//@desc update specific category by id
//@route PUT /api/v1/categories/:id
//@access private
exports.updateCategory = handlerFactory.updateOne(CategoryModel);

//@desc delete specific category by id
//@route DELETE /api/v1/categories/:id
//@access private
exports.deleteCategory = handlerFactory.deleteOne(CategoryModel);
