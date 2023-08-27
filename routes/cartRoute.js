const express = require('express');

/**
 * @openapi
 * tags:
 *   name: Cart
 *   description: Operations related to the user's shopping cart
 */

/**
 * @openapi
 * /api/v1/cart:
 *   post:
 *     summary: Add a product to the user's shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add to the cart.
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product to add (default is 1).
 *               color:
 *                 type: string
 *                 description: Color of the product (optional).
 *             required:
 *               - productId
 *     responses:
 *       201:
 *         description: Product added to the cart successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *
 *   get:
 *     summary: Get the user's shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's shopping cart retrieved successfully.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *
 *   delete:
 *     summary: Clear the user's shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's shopping cart cleared successfully.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */

/**
 * @openapi
 * /api/v1/cart/applyCoupon:
 *   put:
 *     summary: Apply a coupon code to the user's shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               couponCode:
 *                 type: string
 *                 description: Coupon code to apply to the cart.
 *             required:
 *               - couponCode
 *     responses:
 *       200:
 *         description: Coupon applied to the cart successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */

/**
 * @openapi
 * /api/v1/cart/{itemId}:
 *   put:
 *     summary: Update the quantity of a specific item in the user's shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: ID of the cart item to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *                 description: New quantity for the cart item.
 *             required:
 *               - quantity
 *     responses:
 *       200:
 *         description: Cart item quantity updated successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *
 *   delete:
 *     summary: Remove a specific item from the user's shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: ID of the cart item to remove.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item removed successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */




const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require('../services/cartService');
const authService = require('../services/authService');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));
router
  .route('/')
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);

router.put('/applyCoupon', applyCoupon);

router
  .route('/:itemId')
  .put(updateCartItemQuantity)
  .delete(removeSpecificCartItem);

module.exports = router;
