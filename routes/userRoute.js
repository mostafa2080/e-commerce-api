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
} = require('../services/userService');

const {
  getUserValidator,
  createUserValidator,
  deleteUserValidator,
  updateUserValidator,
} = require('../utils/validators/userValidator');

router
  .route('/')
  .post(uploadUserImage, processingImage, createUserValidator, createUser)
  .get(getUsers);
router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put(uploadUserImage, processingImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
