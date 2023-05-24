var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

require('dotenv').config()

const authJwt =require("./middleware/auth-jwt");
const { errorHandler } = require('./middleware/errorHandler');

const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/category');


var app = express();

app.use('/images', express.static('./public/images', {
    maxAge: 31536000 // cache for one year
  }));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors())

app.use(authJwt());
app.use(express.static(path.join(__dirname, 'public')));

const version=process.env.VERSION
app.use(`${version}/products`, productsRouter);
app.use(`${version}/orders`, ordersRouter);
app.use(`${version}/categories`, categoriesRouter);
app.use(`${version}/users`, usersRouter); 

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json(err,'error');
// });

app.use(errorHandler)

module.exports = app;
