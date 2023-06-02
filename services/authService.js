const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');
const ApiError = require('../utils/apiError');
const sendMail = require('../utils/sendEMail');

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

//@desc Authenticated user to make sure that user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
  //1-check if token exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
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

  // 3-check if user exists
  const Currentuser = await UserModel.findById(decoded.payload);
  // console.log(decoded);
  if (!Currentuser) {
    return next(
      new ApiError('User That Belong to this token is no longer exist', 401)
    );
  }

  //4-check if user password changed after token created
  if (Currentuser.passwordChangedAt) {
    const passChangedAtTimestamp = parseInt(
      Currentuser.passwordChangedAt / 1000,
      10
    );
    // if user password changed after token created
    if (passChangedAtTimestamp > decoded.iat) {
      return next(
        new ApiError(
          'Your password has been changed recently, please login again..',
          401
        )
      );
    }
  }

  req.user = Currentuser;
  next();
});

//@desc Authorization (user permissions)

exports.allowedTo = (...roles) =>
  asyncHandler((req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError('You are not allowed to access this route ', 403)
      );
    }
    next();
    //access allowed roles on the route
    //access the user role
  });

//@desc Forget Password
//@route POST /api/v1/auth/forgetPassword
//@access public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  //1) get user by email
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`User not found for this email ${req.body.email}`, 404)
    );
  }
  //2) if email is exist , generate hash reset random 6 digits and save it in DB
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');
  console.log(resetCode);
  console.log(hashedResetCode);

  //save the hashed reset code into the database
  user.passwordResetToken = hashedResetCode;
  //add expiration time to the password reset code (10 minutes)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;
  await user.save();

  const message = `Hi ${user.name}\n we have received a request to reset your password on E-Shop Account \n ${resetCode} \n Enter this code to complete the reset request. \n Thanks for helping us keep your account secure \n The E-Shop Team`;

  //3) send the reset code via email
  try {
    await sendMail({
      email: user.email,
      subject: 'Your Password resset code (Valid for 10 min )',
      message,
    });
  } catch (e) {
    user.resetCode = undefined;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return next(
      new ApiError(
        'Something went wrong when sending email, please try again later',
        500
      )
    );
  }
  res
    .status(200)
    .json({ status: 'success', message: 'Your reset code sent successfully' });
});

//@desc verify reset code
//@route POST /api/v1/auth/verifyResetCode
//@access public

exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // 1) get user based on reset code
  const hashedCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex');

  const user = await UserModel.findOne({
    passwordResetToken: hashedCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ApiError('Password reset token is invalid or has expired', 400)
    );
  }

  // Update the user's passwordResetVerified field
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({ status: 'success' });
});

//@desc verify reset password
//@route POST /api/v1/auth/resetPassword
//@access public

exports.resetPassword = asyncHandler(async (req, res, next) => {
  //1) get user based on their email
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`User not found for this email ${req.body.email}`, 404)
    );
  }
  //2) check if reset code is verified
  if (!user.passwordResetVerified) {
    return next(new ApiError('Password reset token not verified', 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  await user.save();

  //3) if everything okay, generate a new token
  const token = createToken(user._id);
  res.status(200).json({ token });
});
