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

router
  .route('/')
  .post(
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
    uploadCategoryImage,
    processingImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(deleteCategoryValidator, deleteCategory);

const subCategoryRoute = require('./subCategoryRoute');

router.use('/:categoryId/subcategories', subCategoryRoute);

module.exports = router;
