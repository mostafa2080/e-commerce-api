const asyncHandler = require('express-async-handler');
const UserModel = require('../models/userModel');
const ApiError = require('../utils/apiError');

exports.addProductToWishList = asyncHandler(async (req, res, next) => {
  const User = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: req.body.productId },
    },
    {
      new: true,
    }
  );
  if (!User) {
    return next(new ApiError('Something went wrong', 401));
  }
  res.status(200).json({
    status: 'success',
    message: 'product added successfully to your wishlist',
    data: User.wishList,
  });
});

exports.removeProductFromWishList = asyncHandler(async (req, res, next) => {
  const User = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishList: req.params.productId },
    },
    {
      new: true,
    }
  );
  if (!User) {
    return next(new ApiError('Something went wrong', 401));
  }
  res.status(200).json({
    status: 'success',
    message: 'product Removed successfully to your wishlist',
    data: User.wishList,
  });
});
