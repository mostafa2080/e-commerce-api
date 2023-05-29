const SubCategoryModel = require('../models/subCategoryModel');
const handlerFactory = require('./handlersFactory');

//setting categoryId from params in case it didn't exist in body
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

//filtering
exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) {
    filterObj = { category: req.params.categoryId };
    req.filterObj = filterObj;
  }
  next();
};

//@desc create new subcategory
//@route POST /api/v1/subcategories
//@access private
exports.createSubCategory = handlerFactory.createOne(SubCategoryModel);

//@desc get specific category by id
//@route get /api/v1/categories/:id
//@access public
exports.getSubCategory = handlerFactory.getOne(SubCategoryModel);

//@desc get all subcategories
//@route POST /api/v1/subcategories
//@access public
exports.getSubCategories = handlerFactory.getAll(SubCategoryModel);

//@desc update specific subcategory by id
//@route PUT /api/v1/categories/:id
//@access private
exports.updateSubCategory = handlerFactory.updateOne(SubCategoryModel);

//@desc delete specific subcategory by id
//@route DELETE /api/v1/subcategories/:id
//@access private
exports.deleteSubCategory = handlerFactory.deleteOne(SubCategoryModel);
