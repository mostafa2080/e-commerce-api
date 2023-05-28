const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory ID '),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Too Short SubCategory Name')
    .isLength({ max: 32 })
    .withMessage('Too Long SubCategory name'),
  check('category')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Invalid Category ID'),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory ID '),
  check('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2, max: 32 }),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory ID '),
  validatorMiddleware,
];
