const express = require('express');

const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  processingImage,
} = require('../services/productService');

const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/ProductValidator');

const reviewsRoute = require('./reviewRoute');
const { protect, allowedTo } = require('../services/authService');
//nested Route
router.use('/:productId/reviews', reviewsRoute);
router
  .route('/')
  .post(
    protect,
    allowedTo('admin', 'manager'),
    uploadProductImages,
    processingImage,
    createProductValidator,
    createProduct
  )
  .get(getProducts);
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    protect,
    allowedTo('admin', 'manager'),
    uploadProductImages,
    processingImage,
    updateProductValidator,
    updateProduct
  )
  .delete(protect, allowedTo('admin'), deleteProductValidator, deleteProduct);

module.exports = router;
