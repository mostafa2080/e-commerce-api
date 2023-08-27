const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     SubCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the subcategory.
 *         slug:
 *           type: string
 *           description: Slug version of the subcategory name (lowercase).
 *         category:
 *           type: string
 *           description: Category ID to which the subcategory belongs.
 *       required:
 *         - name
 *         - category
 *       example:
 *         name: "Electronics"
 *         category: "category123"
 */

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
