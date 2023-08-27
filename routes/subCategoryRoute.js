const express = require('express');


/**
 * @openapi
 * tags:
 *   name: SubCategories
 *   description: API endpoints for managing subcategories.
 */

/**
 * @openapi
 * /api/v1/categories/{categoryId}/subcategories:
 *   post:
 *     summary: Create a new subcategory.
 *     description: Create a new subcategory within a specific category.
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the parent category.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       '201':
 *         description: Subcategory created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       '400':
 *         description: Bad request. Invalid data or missing fields.
 *       '401':
 *         description: Unauthorized. User does not have permission.
 *       '403':
 *         description: Forbidden. User does not have sufficient privileges.
 *
 *   get:
 *     summary: Get a list of subcategories.
 *     description: Retrieve a list of subcategories within a specific category.
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the parent category.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of subcategories retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategory'
 *       '401':
 *         description: Unauthorized. User does not have permission.
 *       '403':
 *         description: Forbidden. User does not have sufficient privileges.
 */

/**
 * @openapi
 * /api/v1/categories/{categoryId}/subcategories/{id}:
 *   get:
 *     summary: Get a subcategory by ID.
 *     description: Retrieve a subcategory by its unique ID within a specific category.
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the parent category.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subcategory to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Subcategory retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       '404':
 *         description: Subcategory not found.
 *       '401':
 *         description: Unauthorized. User does not have permission.
 *       '403':
 *         description: Forbidden. User does not have sufficient privileges.
 *
 *   put:
 *     summary: Update a subcategory by ID.
 *     description: Update a subcategory's details by its unique ID within a specific category.
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the parent category.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subcategory to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       '200':
 *         description: Subcategory updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       '400':
 *         description: Bad request. Invalid data or missing fields.
 *       '401':
 *         description: Unauthorized. User does not have permission.
 *       '403':
 *         description: Forbidden. User does not have sufficient privileges.
 *       '404':
 *         description: Subcategory not found.
 *
 *   delete:
 *     summary: Delete a subcategory by ID.
 *     description: Delete a subcategory by its unique ID within a specific category.
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the parent category.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subcategory to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Subcategory deleted successfully.
 *       '404':
 *         description: Subcategory not found.
 *       '401':
 *         description: Unauthorized. User does not have permission.
 *       '403':
 *         description: Forbidden. User does not have sufficient privileges.
 */


const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require('../services/subCategoryService');

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../utils/validators/subCategoryValidator');

const { protect, allowedTo } = require('../services/authService');

//@desc allow access to the category
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    protect,
    allowedTo('admin', 'manager'),
    setCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategory
  )
  .get(createFilterObj, getSubCategories);
router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .put(
    protect,
    allowedTo('admin', 'manager'),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    protect,
    allowedTo('admin'),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

module.exports = router;
