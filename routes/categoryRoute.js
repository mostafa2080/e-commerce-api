const express = require('express');

/**
 * @openapi
 * tags:
 *   name: Categories
 *   description: Operations related to product categories
 */

/**
 * @openapi
 * /api/v1/categories:
 *   post:
 *     summary: Create a new product category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Category'  # Reference to the Category schema
 *     responses:
 *       201:
 *         description: Product category created successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *
 *   get:
 *     summary: Get a list of product categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of product categories retrieved successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 */

/**
 * @openapi
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get details of a specific product category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product category to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product category details retrieved successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *
 *   put:
 *     summary: Update a product category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product category to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Category'  # Reference to the Category schema
 *     responses:
 *       200:
 *         description: Product category updated successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *
 *   delete:
 *     summary: Delete a product category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product category to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product category deleted successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */
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
