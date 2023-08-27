const express = require('express');

const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  processingImage,
} = require('../services/productService');

const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/ProductValidator');

const reviewsRoute = require('./reviewRoute');
const { protect, allowedTo } = require('../services/authService');

/**
 * @openapi
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *              $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */


/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     summary: Get a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *       400:
 *         description: Bad request. Invalid input data.
 */


/**
 * @openapi
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       400:
 *         description: Bad request. Invalid input data.
 *       404:
 *         description: Product not found.
 */

/**
 * @openapi
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of image files (multipart upload)
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *       404:
 *         description: Product not found.
 */

/**
 * @openapi
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *       404:
 *         description: Product not found.
 */

/**
 * @openapi
 * /api/v1/products/{id}/reviews:
 *   get:
 *     summary: Get product reviews by product ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve reviews for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of product reviews retrieved successfully
 *       400:
 *         description: Bad request. Invalid input data.
 *       404:
 *         description: Product not found.
 */
//nested Route
router.use('/:productId/reviews', reviewsRoute);
router
  .route('/')
  .post(
    protect,
    allowedTo('admin', 'manager'),
    uploadProductImages,
    processingImage,
    createProductValidator,
    createProduct
  )
  .get(getProducts);
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    protect,
    allowedTo('admin', 'manager'),
    uploadProductImages,
    processingImage,
    updateProductValidator,
    updateProduct
  )
  .delete(protect, allowedTo('admin'), deleteProductValidator, deleteProduct);

module.exports = router;
