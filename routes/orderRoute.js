const express = require('express');
/**
 * @openapi
 * tags:
 *   name: Orders
 *   description: Operations related to orders
 */

/**
 * @openapi
 * /api/v1/orders/checkout-session/{cartId}:
 *   get:
 *     summary: Get a checkout session for a cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: ID of the cart for which the checkout session is requested.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Checkout session retrieved successfully.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */

/**
 * @openapi
 * /api/v1/orders/{cartId}:
 *   post:
 *     summary: Create a new cash order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: ID of the cart for which the order is created.
 *         schema:
 *           $ref: '#/components/schemas/Order' 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethodType:
 *                 type: string
 *                 enum: ['card', 'cash']
 *                 description: The payment method type (card or cash).
 *             required:
 *               - paymentMethodType
 *     responses:
 *       201:
 *         description: Cash order created successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *
 *   get:
 *     summary: Get a list of orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders retrieved successfully.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */

/**
 * @openapi
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Get details of a specific order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details retrieved successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *
 *   put:
 *     summary: Update an order to paid status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update to paid status.
 *         schema:
 *           $ref: '#/components/schemas/Order' 
 *     responses:
 *       200:
 *         description: Order updated to paid status successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */

/**
 * @openapi
 * /api/v1/orders/{id}/deliver:
 *   put:
 *     summary: Update an order to delivered status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update to delivered status.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order updated to delivered status successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */


const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} = require('../services/orderService');

const authService = require('../services/authService');

const router = express.Router();

router.use(authService.protect);

router.get(
  '/checkout-session/:cartId',
  authService.allowedTo('user'),
  checkoutSession
);
router.route('/:cartId').post(authService.allowedTo('user'), createCashOrder);
router.get(
  '/',
  authService.allowedTo('user', 'admin', 'manager'),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get('/:id', findSpecificOrder);
router.put(
  '/:id/pay',
  authService.allowedTo('admin', 'manager'),
  updateOrderToPaid
);
router.put(
  '/:id/deliver',
  authService.allowedTo('admin', 'manager'),
  updateOrderToDelivered
);
module.exports = router;
