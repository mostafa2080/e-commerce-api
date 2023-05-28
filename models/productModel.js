const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    title: {
      this: String,
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
      maxlength: [100, 'Too long Product Description'],
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
      max: [20, 'Too long Product Price'],
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
    subcategory: [
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
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);