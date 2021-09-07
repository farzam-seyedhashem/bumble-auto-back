"use strict";

var util = require("util");

var multer = require("multer");

var maxSize = 2 * 1024 * 1024;
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    console.log(__basedir);
    cb(null, "./public/images/");
  },
  filename: function filename(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
});
var uploadFile = multer({
  storage: storage // limits: { fileSize: maxSize },

}).single("file");
var uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;