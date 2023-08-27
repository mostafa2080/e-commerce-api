const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         cartItems:
 *           type: array
 *           description: List of items in the shopping cart.
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID of the product in the cart.
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product in the cart.
 *               color:
 *                 type: string
 *                 description: Color of the product in the cart.
 *               price:
 *                 type: number
 *                 description: Price of the product in the cart.
 *           required:
 *             - product
 *             - quantity
 *             - price
 *         totalCartPrice:
 *           type: number
 *           description: Total price of items in the cart.
 *         totalPriceAfterDiscount:
 *           type: number
 *           description: Total price after applying discounts.
 *         user:
 *           type: string
 *           description: ID of the user associated with the cart.
 */

const cartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        price: Number,
      },
    ],
    totalCartPrice: Number,
    totalPriceAfterDiscount: Number,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
