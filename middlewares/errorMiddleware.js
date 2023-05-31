const ApiError = require('../utils/apiError');

const sendErrForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
    message: err.message,
  });
};
const sendErrForProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleJwtInvalidSignature = () =>
  new ApiError('Invalid Token Please Login Again...', 401);
const handleJwtExpired = () =>
  new ApiError('Token Expired Please Login Again...', 401);

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrForDev(err, res);
  } else {
    if (err.name === 'JsonWebTokenError') {
      err = handleJwtInvalidSignature();
    }
    if (err.name === 'TokenExpiredError') {
      err = handleJwtExpired();
    }

    sendErrForProd(err, res);
  }
};
module.exports = globalError;
