const mongoose = require('mongoose');
/**
 * @openapi
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the brand.
 *         slug:
 *           type: string
 *           description: The slug of the brand.
 *         image:
 *           type: string
 *           description: URL of the brand image.
 */

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name required'],
      unique: [true, 'Name can not be duplicated'],
      minlength: [3, 'Too short brand name'],
      maxlength: [32, 'Too long brand name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

//model
const BrandModel = mongoose.model('Brand', brandSchema);

module.exports = BrandModel;
