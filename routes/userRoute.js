const express = require('express');

const router = express.Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  processingImage,
  ChangeUserPassword,
} = require('../services/userService');

const {
  getUserValidator,
  createUserValidator,
  deleteUserValidator,
  updateUserValidator,
  changeUserPasswordValidator,
} = require('../utils/validators/userValidator');

const { protect, allowedTo } = require('../services/authService');

router
  .route('/changePassword/:id')
  .put(changeUserPasswordValidator, ChangeUserPassword);

router
  .route('/')
  .post(
    protect,
    allowedTo('admin'),
    uploadUserImage,
    processingImage,
    createUserValidator,
    createUser
  )
  .get(protect, allowedTo('admin', 'manager'), getUsers);
router
  .route('/:id')
  .get(protect, allowedTo('admin', 'manager'), getUserValidator, getUser)
  .put(
    protect,
    allowedTo('admin'),
    uploadUserImage,
    processingImage,
    updateUserValidator,
    updateUser
  )
  .delete(protect, allowedTo('admin'), deleteUserValidator, deleteUser);

module.exports = router;
