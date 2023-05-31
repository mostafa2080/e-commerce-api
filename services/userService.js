const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/apiError');
const UserModel = require('../models/userModel');
const handlerFactory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

exports.uploadUserImage = uploadSingleImage('profileImage');

//image processing
exports.processingImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(300, 300)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`./uploads/users/${filename}`);
    req.body.profileImage = filename;
  }

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
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      profileImage: req.body.profileImage,
      slug: req.body.slug,
      phone: req.body.phone,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError('Document not found', 404));
  }
  res.status(200).json({ data: document });
});

exports.ChangeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError('Document not found', 404));
  }
  res.status(200).json({ data: document });
});
//@desc delete specific User by id
//@route Delete /api/v1/users/:id
//@access private
exports.deleteUser = handlerFactory.deleteOne(UserModel);
