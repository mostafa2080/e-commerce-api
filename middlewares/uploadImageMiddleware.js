const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');

  //diskStorage
  // const multerStorage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, './uploads/categories');
  //   },
  //   filename: function (req, file, cb) {
  //     const ext = file.mimetype.split('/')[1];
  //     const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
  //     cb(null, filename);
  //   },
  // });

exports.uploadSingleImage = (fieldName) => {
  const multerStorage = multer.memoryStorage();


  const multerFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('File Must be An Image', 400), false);
    }
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFileFilter,
  });

  return upload.single(fieldName);
};
