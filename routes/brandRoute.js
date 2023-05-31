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

const { protect, allowedTo } = require('../services/authService');

router
  .route('/')
  .post(
    protect,
    allowedTo('admin', 'manager'),
    uploadBrandImage,
    processingImage,
    createBrandValidator,
    createBrand
  )
  .get(getBrands);
router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(
    protect,
    allowedTo('admin', 'manager'),
    uploadBrandImage,
    processingImage,
    updateBrandValidator,
    updateBrand
  )
  .delete(protect, allowedTo('admin'), deleteBrandValidator, deleteBrand);

module.exports = router;
