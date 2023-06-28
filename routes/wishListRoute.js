const express = require('express');

const router = express.Router();
const { addProductToWishList } = require('../services/wishListService');

// const {
//   getBrandValidator,
//   createBrandValidator,
//   deleteBrandValidator,
//   updateBrandValidator,
// } = require('../utils/validators/brandValidator');

const { protect, allowedTo } = require('../services/authService');

router.route('/').post(protect, allowedTo('user'), addProductToWishList);

module.exports = router;
