const express = require('express');
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

// router.get(
//   '/checkout-session/:cartId',
//   authService.allowedTo('user'),
//   checkoutSession
// );
router.route('/:cartId').post(authService.allowedTo('user'), createCashOrder);

module.exports = router;
