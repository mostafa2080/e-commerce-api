const slugify = require('slugify');
const { check, body } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const Category = require('../../models/categoryModel');

const SubCategory = require('../../models/subCategoryModel');

exports.createProductValidator = [
  check('title')
    .isLength({ min: 3 })
    .withMessage('must be at least 3 chars')
    .notEmpty()
    .withMessage('Product required')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ max: 2000 })
    .withMessage('Too long description'),
  check('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Product quantity must be a number'),
  check('sold')
    .optional()
    .isNumeric()
    .withMessage('Product quantity must be a number'),
  check('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a number')
    .isLength({ max: 32 })
    .withMessage('To long price'),
  check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Product priceAfterDiscount must be a number')
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error('priceAfterDiscount must be lower than price');
      }
      return true;
    }),
  check('colors')
    .optional()
    .isArray()
    .withMessage('availableColors should be array of string'),
  check('imageCover').notEmpty().withMessage('Product imageCover is required'),
  check('images')
    .optional()
    .isArray()
    .withMessage('images should be array of string'),
  check('category')
    .notEmpty()
    .withMessage('Product must be belong to a category')
    .isMongoId()
    .withMessage('Invalid ID format')
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category found for this ID ${categoryId}`)
          );
        }
      })
    ),
  check('subcategories')
    .optional()
    .isMongoId()
    .withMessage('Invalid ID format')
    .custom((subcategoryIds) =>
      SubCategory.find({ _id: { $exists: true, $in: subcategoryIds } }).then(
        (subcategories) => {
          if (
            subcategories.length < 1 ||
            subcategoryIds.length !== subcategories.length
          ) {
            return Promise.reject(
              new Error(`No subcategory found for this ID ${subcategoryIds}`)
            );
          }
        }
      )
    )
    .custom((subcategoryIds, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subcategoriesIds = [];
          subcategories.forEach((subcategory) => {
            subcategoriesIds.push(subcategory._id.toString());
          });
          //@desc check if subcategories are included in the category
          const checker = (target, arr) =>
            !subcategoryIds.every((id) => subcategoriesIds.includes(id));
          if (checker(subcategoryIds, subcategoriesIds)) {
            return Promise.reject(
              new Error(
                `NoT  All subcategory belong To The Category ${subcategoryIds}`
              )
            );
          }
        }
      )
    ),
  check('brand').optional().isMongoId().withMessage('Invalid ID format'),
  check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingsAverage must be a number')
    .isLength({ min: 1 })
    .withMessage('Rating must be above or equal 1.0')
    .isLength({ max: 5 })
    .withMessage('Rating must be below or equal 5.0'),
  check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('ratingsQuantity must be a number'),

  validatorMiddleware,
];

exports.getProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID format'),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID format'),
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID format'),
];
