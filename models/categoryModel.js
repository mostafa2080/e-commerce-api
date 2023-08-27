const mongoose = require('mongoose');
/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category.
 *         slug:
 *           type: string
 *           description: The slug of the category.
 *         image:
 *           type: string
 *           description: URL of the category image.
 */

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name required'],
      unique: [true, 'Name can not be duplicated'],
      minlength: [3, 'Too short category name'],
      maxlength: [32, 'Too long category name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};
categorySchema.post('init', (doc) => {
  setImageUrl(doc);
});
categorySchema.post('save', (doc) => {
  setImageUrl(doc);
});
//model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
