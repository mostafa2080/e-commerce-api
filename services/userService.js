const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const UserModel = require('../models/userModel');
const handlerFactory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

exports.uploadUserImage = uploadSingleImage('profileImg');

//image processing
exports.processingImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`./uploads/users/${filename}`);
  req.body.image = filename;

  next();
});

//@desc create new User
//@route POST /api/v1/users
//@access private
exports.createUser = handlerFactory.createOne(UserModel);

//@desc get all users
//@route GET /api/v1/users
//@access public
exports.getUsers = handlerFactory.getAll(UserModel);
//@desc get specific User by id
//@route GET /api/v1/users/:id
//@access public
exports.getUser = handlerFactory.getOne(UserModel);

//@desc update specific User by id
//@route PUT /api/v1/users/:id
//@access private
exports.updateUser = handlerFactory.updateOne(UserModel);

//@desc delete specific User by id
//@route Delete /api/v1/users/:id
//@access private
exports.deleteUser = handlerFactory.deleteOne(UserModel);
