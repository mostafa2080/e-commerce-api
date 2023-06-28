const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const dbconnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const subCategoryRoute = require('./routes/subCategoryRoute');
const brandRoute = require('./routes/brandRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const reviewRoute = require('./routes/reviewRoute');
const wishListRoute = require('./routes/wishListRoute');
const addressRoute = require('./routes/addressRoute');

//express app
const app = express();

//connect with DB
dbconnection();

//Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(` Mode: ${process.env.NODE_ENV}`);
}
//routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/wishlist', wishListRoute);
app.use('/api/v1/address', addressRoute);

app.all('*', (req, res, next) => {
  next(new ApiError(`Can not find this Route ${req.originalUrl}`, 400));
});

//err mw
app.use(globalError);
//listening
const { PORT } = process.env;
const server = app.listen(PORT, () => {
  console.log(`app running on Port: ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Error ${err}`);
  server.close(() => {
    console.log(`shutting down....`);
    process.exit(1);
  });
});
