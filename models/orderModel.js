const mongoose = require('mongoose');
/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: ID of the user who placed the order.
 *         cartItems:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID of the product in the order.
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product.
 *               color:
 *                 type: string
 *                 description: Color of the product.
 *               price:
 *                 type: number
 *                 description: Price of the product.
 *         taxPrice:
 *           type: number
 *           description: Total tax price for the order.
 *         shippingAddress:
 *           type: object
 *           properties:
 *             details:
 *               type: string
 *               description: Shipping address details.
 *             phone:
 *               type: string
 *               description: Phone number for shipping.
 *             city:
 *               type: string
 *               description: City for shipping.
 *             postalCode:
 *               type: string
 *               description: Postal code for shipping.
 *         shippingPrice:
 *           type: number
 *           description: Shipping price for the order.
 *         totalOrderPrice:
 *           type: number
 *           description: Total price for the order.
 *         paymentMethodType:
 *           type: string
 *           enum: [card, cash]
 *           description: Payment method type (card or cash).
 *         isPaid:
 *           type: boolean
 *           description: Whether the order is paid or not.
 *         paidAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the order was paid.
 *         isDelivered:
 *           type: boolean
 *           description: Whether the order is delivered or not.
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the order was delivered.
 *       required:
 *         - user
 *         - cartItems
 *         - taxPrice
 *         - shippingAddress
 *         - shippingPrice
 *         - totalOrderPrice
 *         - paymentMethodType
 *         - isPaid
 *         - isDelivered
 */


const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Order must be belong to user'],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
        color: String,
        price: Number,
      },
    ],

    taxPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      details: String,
      phone: String,
      city: String,
      postalCode: String,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalOrderPrice: {
      type: Number,
    },
    paymentMethodType: {
      type: String,
      enum: ['card', 'cash'],
      default: 'cash',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name profileImg email phone',
  }).populate({
    path: 'cartItems.product',
    select: 'title imageCover ',
  });

  next();
});

module.exports = mongoose.model('Order', orderSchema);

// In@in2016
//progahmedelsayed@gmail.com