"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _image_model = _interopRequireDefault(require("../models/image_model"));

var _blog_category_model = _interopRequireDefault(require("../models/blog_category_model"));

var _blog_model = _interopRequireDefault(require("../models/blog_model"));

var _slider_model = _interopRequireDefault(require("../models/slider_model"));

var _user_model = _interopRequireDefault(require("../models/user_model"));

exports.index = function (req, res) {
  res.status(200);
  res.send({
    "default-lang": "en",
    "models": {
      "slider": _slider_model["default"].info(),
      "blog": _blog_model["default"].info(),
      "blog-category": _blog_category_model["default"].info(),
      "user": _user_model["default"].info()
    }
  });
};