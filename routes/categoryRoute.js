const express = require('express');

const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  processingImage,
} = require('../services/categoryService');

const {
  getCategoryValidator,
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} = require('../utils/validators/categoryValidator');

const { protect, allowedTo } = require('../services/authService');

router
  .route('/')
  .post(
    protect,
    allowedTo('admin', 'manager'),
    uploadCategoryImage,
    processingImage,
    createCategoryValidator,
    createCategory
  )
  .get(getCategories);
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(
    protect,
    allowedTo('admin', 'manager'),
    uploadCategoryImage,
    processingImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(protect, allowedTo('admin'), deleteCategoryValidator, deleteCategory);

const subCategoryRoute = require('./subCategoryRoute');

router.use('/:categoryId/subcategories', subCategoryRoute);

module.exports = router;
