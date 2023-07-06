const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

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

//Middleware
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'uploads')));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(` Mode: ${process.env.NODE_ENV}`);
}
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
