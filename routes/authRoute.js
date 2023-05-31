const express = require('express');

const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require('../services/authService');

const {
  signupValidator,
  loginValidator,
  forgotPasswordValidator,
} = require('../utils/validators/authValidator');

router.route('/signup').post(signupValidator, signup);

router.route('/login').post(loginValidator, login);
router.route('/forgotPassword').post(forgotPasswordValidator, forgotPassword);
router.route('/verifyResetCode').post(verifyPassResetCode);
router.route('/resetPassword').put(resetPassword);

module.exports = router;
