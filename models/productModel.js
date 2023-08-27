const mongoose = require('mongoose');
/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the product.
 *         slug:
 *           type: string
 *           description: The slug of the product.
 *         description:
 *           type: string
 *           description: The description of the product.
 *         quantity:
 *           type: number
 *           description: The quantity of the product.
 *         sold:
 *           type: number
 *           description: The number of products sold.
 *         price:
 *           type: number
 *           description: The price of the product.
 *         priceAfterDiscount:
 *           type: number
 *           description: The price of the product after applying discounts.
 *         colors:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of available colors for the product.
 *         imageCover:
 *           type: string
 *           description: The URL of the product's cover image.
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of image URLs associated with the product.
 *         category:
 *           type: string
 *           description: The ID of the category to which the product belongs.
 *         subcategories:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of subcategory IDs associated with the product.
 *         brand:
 *           type: string
 *           description: The ID of the brand associated with the product.
 *         ratingsAverage:
 *           type: number
 *           description: The average rating of the product.
 *         ratingsQuantity:
 *           type: number
 *           description: The number of ratings for the product.
 *       required:
 *         - title
 *         - slug
 *         - description
 *         - quantity
 *         - price
 *         - imageCover
 *         - category
 */

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Too short Product Title'],
      maxlength: [100, 'Too long Product Title'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'description is required'],
      trim: true,
      minlength: [20, 'Too short Product Description'],
      maxlength: [1000, 'Too long Product Description'],
    },
    quantity: {
      type: Number,
      required: [true, 'quantity is required'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
      trim: true,
      max: [200000, 'Too long Product Price'],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: {
      type: [String],
    },
    imageCover: {
      type: String,
      required: [true, 'Product imageCover is required'],
    },
    images: {
      type: [String],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product Category is required'],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Subcategory',
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating Must be or above 1'],
      max: [5, 'Rating Must be below 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name ',
  });
  next();
});
const setImageUrl = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if (doc.images) {
    const imageUrls = doc.images.map(
      (image) => `${process.env.BASE_URL}/products/${image}`
    );
    doc.images = imageUrls;
  }
};

productSchema.post('init', (doc) => {
  setImageUrl(doc);
});
productSchema.post('save', (doc) => {
  setImageUrl(doc);
});
module.exports = mongoose.model('Product', productSchema);
