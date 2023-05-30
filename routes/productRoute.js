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

router
  .route('/')
  .post(uploadProductImages, processingImage, createProductValidator, createProduct)
  .get(getProducts);
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(uploadProductImages, processingImage, updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
