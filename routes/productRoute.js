const express = require('express');

const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  processingImage,
} = require('../services/productService');

const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/ProductValidator');

router
  .route('/')
  .post(uploadImage, processingImage, createProductValidator, createProduct)
  .get(getProducts);
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(uploadImage, processingImage, updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
