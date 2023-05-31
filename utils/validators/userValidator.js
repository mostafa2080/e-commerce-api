const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.createUserValidator = [
  check('name')
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('Too Short User Name')

    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('email')
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('Email already exists'));
        }
      })
    ),
  check('password')
    .notEmpty()
    .withMessage('password required')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters')
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirmation) {
        throw new Error('password does not match');
      }
      return true;
    }),
  check('passwordConfirmation')
    .notEmpty()
    .withMessage('password confirmation required'),
  check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Inavalid Phone Number Only EGY And SA Numbers Accepted '),
  check('profileImage').optional(),
  check('role').optional(),
  validatorMiddleware,
];

exports.getUserValidator = [
  check('id').isMongoId().withMessage('Invalid User ID '),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check('id').isMongoId().withMessage('Invalid User ID '),
  body('name').custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check('id').isMongoId().withMessage('Invalid User ID '),
  validatorMiddleware,
];
