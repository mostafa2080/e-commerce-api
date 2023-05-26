const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.getCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Category ID '),
  validatorMiddleware, 
];

exports.createCategoryValidator = [
  check('name')
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('Too Short Category Name')
    .isLength({ max: 32 })
    .withMessage('Too Long category name'),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Category ID '),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Category ID '),
  validatorMiddleware,
];
