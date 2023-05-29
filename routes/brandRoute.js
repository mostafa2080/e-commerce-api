const express = require('express');

const router = express.Router();
const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  processingImage,
} = require('../services/brandService');

const {
  getBrandValidator,
  createBrandValidator,
  deleteBrandValidator,
  updateBrandValidator,
} = require('../utils/validators/brandValidator');

router
  .route('/')
  .post(uploadBrandImage, processingImage, createBrandValidator, createBrand)
  .get(getBrands);
router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(uploadBrandImage, processingImage, updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
