"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _upload = _interopRequireDefault(require("./routes/upload"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseIntl = _interopRequireDefault(require("mongoose-intl"));

var _inventory = _interopRequireDefault(require("./controller/inventory"));

var _blog = _interopRequireDefault(require("./routes/blog"));

var _blog_category = _interopRequireDefault(require("./routes/blog_category"));

var _model = _interopRequireDefault(require("./routes/model"));

var _user = _interopRequireDefault(require("./routes/user"));

var _inventory2 = _interopRequireDefault(require("./routes/inventory"));

var _slider = _interopRequireDefault(require("./routes/slider"));

var _role = _interopRequireDefault(require("./routes/role"));

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var cors = require('cors');

var CronJob = require('cron').CronJob;

//
var fs = require('fs');

var csv = require('csv-parser');

var schedule = require('node-schedule');

var bodyParser = require('body-parser'); // var multer = require('multer');
// var upload = multer();


var app = express(); // var job = new CronJob(
//     '* * 1 * * *',
//     function() {
//         console.log('start');
//       fs.createReadStream(path.join(__dirname, '../public/inventory/DealerCenter_Inventory.csv'))
//           .pipe(csv())
//           .on('data', (row) => {
//               console.log(row)
//               InventoryController.storeRow(row)
//           })
//           .on('end', () => {
//             console.log('CSV file successfully processed');
//           });
//     },
//     null,
//     true,
//     'America/Los_Angeles'
// );
// job.start();
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"](path.join(__dirname, '../public')));
/**
 * CORS Handeler
 */

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
app.use(cors());
/**
 * Config MYSQL
 */

_mongoose["default"].set('useNewUrlParser', true);

_mongoose["default"].set('useCreateIndex', true);

_mongoose["default"].connect('mongodb://127.0.0.1:27017/bumble-auto', {
  useNewUrlParser: true
});
/**
 * Global variable
 */


global.__mongoose = _mongoose["default"];
global.__basedir = __dirname;
/**
 * Routes
 */
// app.use('/', indexRouter);

app.use('/model', _model["default"]);
app.use('/role', _role["default"]);
app.use('/user', _user["default"]);
app.use('/inventory', _inventory2["default"]);
app.use('/upload', _upload["default"]);
app.use('/blog', _blog["default"]);
app.use('/blog-category', _blog_category["default"]);
app.use('/slider', _slider["default"]); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;