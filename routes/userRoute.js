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

// const {
//   getBrandValidator,
//   createBrandValidator,
//   deleteBrandValidator,
//   updateBrandValidator,
// } = require('../utils/validators/brandValidator');

router
  .route('/')
  .post(uploadUserImage, processingImage, createUser)
  .get(getUsers);
router
  .route('/:id')
  .get(getUser)
  .put(uploadUserImage, processingImage, updateUser)
  .delete(deleteUser);

module.exports = router;
