const multer = require('multer');
const CategoryModel = require('../models/categoryModel');
const handlerFactory = require('./handlersFactory');

const { v4: uuidv4 } = require('uuid');

//diskStorage
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/categories');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: multerStorage });

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
