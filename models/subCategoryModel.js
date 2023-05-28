const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name Required'],
      unique: [true, 'sub category name can not be duplicated'],
      minLength: [2, 'Too Short Sub Category name '],
      maxLength: [32, 'Too Long SubCategory name '],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Sub Category must belong to one of categories'],
    },
  },
  { timestamps: true }
);

const subCategoryModel = mongoose.model('SubCategory', subCategorySchema);

module.exports = subCategoryModel;
