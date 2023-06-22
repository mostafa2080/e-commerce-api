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
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require('../services/userService');

const {
  getUserValidator,
  createUserValidator,
  deleteUserValidator,
  updateUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
} = require('../utils/validators/userValidator');

const { protect, allowedTo } = require('../services/authService');

router.get('/getMe', protect, getLoggedUserData, getUser);
router.put('/changeMyPassaowrd', protect, updateLoggedUserPassword);
router.put(
  '/updateMe',
  protect,
  updateLoggedUserValidator,
  updateLoggedUserData
);
router.delete('/deleteMe', protect, deleteLoggedUserData);
//admin
// router.use(protect, allowedTo('admin'));  this will be applied to all the below routes
router
  .route('/changePassword/:id')
  .put(
    allowedTo('admin', 'manager'),
    changeUserPasswordValidator,
    ChangeUserPassword
  );

router
  .route('/')
  .post(uploadUserImage, processingImage, createUserValidator, createUser)
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
