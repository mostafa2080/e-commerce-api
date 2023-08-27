const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the coupon.
 *         expire:
 *           type: string
 *           format: date-time
 *           description: The expiration date and time of the coupon.
 *         discount:
 *           type: number
 *           description: The discount value associated with the coupon.
 *       required:
 *         - name
 *         - expire
 *         - discount
 */

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Coupon name required'],
      unique: true,
    },
    expire: {
      type: Date,
      required: [true, 'Coupon expire time required'],
    },
    discount: {
      type: Number,
      required: [true, 'Coupon discount value required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);
