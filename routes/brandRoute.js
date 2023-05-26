const express = require('express');

const router = express.Router();
const {
  createBrand,
  getCategories,
  getBrand,
  updateBrand,
  deleteBrand,
} = require('../services/brandService');

const {
  getBrandValidator,
  createBrandValidator,
  deleteBrandValidator,
  updateBrandValidator,
} = require('../utils/validators/brandValidator');

router
  .route('/')
  .post(createBrandValidator, createBrand)
  .get(getCategories);
router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

// const subBrandRoute = require('./subBrandRoute');

// router.use('/:BrandId/subcategories', subBrandRoute);

module.exports = router;
