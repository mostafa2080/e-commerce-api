const multer = require('multer');
const asyncHandler = require('express-async-handler');
const CategoryModel = require('../models/categoryModel');
const handlerFactory = require('./handlersFactory');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/apiError');
const sharp = require('sharp');

//diskStorage
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/categories');
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split('/')[1];
//     const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
//     cb(null, filename);
//   },
// });

//memory storage
const multerStorage = multer.memoryStorage();

const multerFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ApiError('File Must be An Image', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFileFilter });

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

exports.uploadCategoryImage = upload.single('image');
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
