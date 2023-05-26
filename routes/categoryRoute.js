const express = require('express');
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../services/categoryService');
const router = express.Router();
const {
  getCategoryValidator,
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} = require('../utils/validators/categoryValidator');
router
  .route('/')
  .post(createCategoryValidator, createCategory)
  .get(getCategories);
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
