const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');
const handlerFactory = require('./handlersFactory');
const ProductModel = require('../models/productModel');

exports.uploadProductImages = uploadMixOfImages([
  { name: 'imageCover', maxCount: 1 },
  {
    name: 'images',
    maxCount: 5,
  },
]);

exports.processingImage = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./uploads/products/${imageCoverFileName}`);
    req.body.imageCover = imageCoverFileName;
  }
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`./uploads/products/${imageName}`);

        //save images to DB
        req.body.images.push(imageName);
      })
    );
    next();
  }
});

//@desc create new product
//@route POST /api/v1/products
//@access private
exports.createProduct = handlerFactory.createOne(ProductModel);

//@desc get all products
//@route POST /api/v1/products
//@access public
exports.getProducts = handlerFactory.getAll(ProductModel, 'Products');

//@desc get specific product by id
//@route get /api/v1/products/:id
//@access public
exports.getProduct = handlerFactory.getOne(ProductModel);

//@desc update specific product by id
//@route PUT /api/v1/products/:id
//@access private
exports.updateProduct = handlerFactory.updateOne(ProductModel);
//@desc delete specific product by id
//@route DELETE /api/v1/products/:id
//@acess private
exports.deleteProduct = handlerFactory.deleteOne(ProductModel);
