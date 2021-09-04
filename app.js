import uploadsRouter from './routes/upload';
import mongoose from 'mongoose';
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var CronJob = require('cron').CronJob;
import mongooseIntl from 'mongoose-intl'
//
const fs = require('fs');

const csv = require('csv-parser');
import InventoryController from './controller/inventory'

const schedule = require('node-schedule');
var bodyParser = require('body-parser');
// var multer = require('multer');
// var upload = multer();
import blogRouter from './routes/blog';
import blogCategoryRouter from './routes/blog_category';
// import indexRouter from './routes/index';
import modelRouter from './routes/model';
import usersRouter from './routes/user';
import inventoryRouter from './routes/inventory';
import sliderRouter from './routes/slider';
import roleRouter from './routes/role';
import requestRouter from './routes/request';
import serviceRouter from './routes/service';
import languageRouter from './routes/language';
import galleryRouter from './routes/gallery';

var app = express();


// var job = new CronJob(
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));



/**
 * CORS Handeler
 */
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())


/**
 * Config MYSQL
 */
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://127.0.0.1:27017/bumble-auto', {useNewUrlParser: true});

/**
 * Global variable
 */
global.__mongoose = mongoose;
global.__basedir = __dirname;

/**
 * Routes
 */
// app.use('/', indexRouter);
app.use('/model', modelRouter);
app.use('/role', roleRouter);
app.use('/user', usersRouter);
app.use('/inventory', inventoryRouter);
app.use('/upload', uploadsRouter);
app.use('/blog', blogRouter);
app.use('/blog-category', blogCategoryRouter);
app.use('/gallery', galleryRouter);
app.use('/slider', sliderRouter);
app.use('/request', requestRouter);
app.use('/service', serviceRouter);
app.use('/language', languageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
