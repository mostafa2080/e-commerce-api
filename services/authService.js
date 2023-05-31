const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');
const ApiError = require('../utils/apiError');

const createToken = (payload) =>
  jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

//@desc Signup
//@route POST /api/v1/auth/signup
//@access public
exports.signup = asyncHandler(async (req, res, next) => {
  //1- create user
  const user = await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  //2- create token
  const token = createToken(user._id);
  //3-send response
  res.status(201).json({ data: user, token });
});

//@desc Login
//@route POST /api/v1/auth/login
//@access public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //1- validate email and password in the body

  //2-check if user is exist &  check if password is correct
  const user = await UserModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError('Invalid credentials', 401));
  }
  //3-create token
  const token = createToken(user._id);
  //4-send response
  res.status(200).json({ data: user, token });
});

exports.protect = asyncHandler((req, res, next) => {
  //1-check if token exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new ApiError('You are not logged in please login to gain access ', 401)
    );
  }
  //2-verify token

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //3-check if user exists

  //4-check if user password changed after token created

  //5-send response
});
