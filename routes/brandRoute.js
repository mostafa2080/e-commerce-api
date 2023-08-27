const express = require('express');

/**
 * @openapi
 * tags:
 *   name: Brands
 *   description: Operations related to brands
 */

/**
 * @openapi
 * /api/v1/brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the brand.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Brand image file.
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Brand created successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *
 *   get:
 *     summary: Get a list of brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of brands retrieved successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 */

/**
 * @openapi
 * /api/v1/brands/{id}:
 *   get:
 *     summary: Get details of a specific brand
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Brand ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand details retrieved successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *
 *   put:
 *     summary: Update a brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Brand ID.
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
 *                 description: The updated name of the brand.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Updated brand image file.
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Brand updated successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *
 *   delete:
 *     summary: Delete a brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Brand ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand deleted successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */

const router = express.Router();
const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  processingImage,
} = require('../services/brandService');

const {
  getBrandValidator,
  createBrandValidator,
  deleteBrandValidator,
  updateBrandValidator,
} = require('../utils/validators/brandValidator');

const { protect, allowedTo } = require('../services/authService');

router
  .route('/')
  .post(
    protect,
    allowedTo('admin', 'manager'),
    uploadBrandImage,
    processingImage,
    createBrandValidator,
    createBrand
  )
  .get(getBrands);
router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(
    protect,
    allowedTo('admin', 'manager'),
    uploadBrandImage,
    processingImage,
    updateBrandValidator,
    updateBrand
  )
  .delete(protect, allowedTo('admin'), deleteBrandValidator, deleteBrand);

module.exports = router;
