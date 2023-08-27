const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const swagger = require('./utils/swagger');

dotenv.config({ path: 'config.env' });
const dbconnection = require('./config/database');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const { webhookCheckout } = require('./services/orderService');

const mountRoutes = require('./routes');
//express app
const app = express();
app.use(cors());
app.options('*', cors());
app.use(compression());

// Checkout webhook
app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  webhookCheckout
);

//connect with DB
dbconnection();

//documentation

//Middleware
app.use(express.json({ limit: '20kb' }));
//hpp http parameter pollution
app.use(
  hpp({
    whitelist: ['price', 'sold', 'quantity', 'ratingAverage', 'ratingQuantity'],
  })
);
app.use(express.static(path.join(__dirname, 'uploads')));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(` Mode: ${process.env.NODE_ENV}`);
}

//data sanitization
app.use(mongoSanitize()); //sanitizing no sql query injection
app.use(xss()); //for sanitizing scripts

// Limit each IP to 100 requests per `window` (here, per 15 minutes)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5,
//   message:
//     'Too many accounts created from this IP, please try again after an hour',
// });

// app.use('/api', limiter);
//csrf

//routes
mountRoutes(app);

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
