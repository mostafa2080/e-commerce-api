const express = require('express');
/**
 * @openapi
 * tags:
 *   name: Coupons
 *   description: Operations related to coupons
 */

/**
 * @openapi
 * /api/v1/coupon:
 *   get:
 *     summary: Get a list of coupons
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of coupons retrieved successfully.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'  # Reference to the Coupon schema
 *     responses:
 *       201:
 *         description: Coupon created successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */

/**
 * @openapi
 * /api/v1/coupon/{id}:
 *   get:
 *     summary: Get details of a specific coupon
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the coupon to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon details retrieved successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *
 *   put:
 *     summary: Update a coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the coupon to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'  
 *     responses:
 *       200:
 *         description: Coupon updated successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *
 *   delete:
 *     summary: Delete a coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the coupon to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon deleted successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */

const {
  getCoupon,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require('../services/couponService');

const authService = require('../services/authService');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('admin', 'manager'));

router.route('/').get(getCoupons).post(createCoupon);
router.route('/:id').get(getCoupon).put(updateCoupon).delete(deleteCoupon);

module.exports = router;
