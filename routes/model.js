"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _models_controller = _interopRequireDefault(require("../controller/models_controller"));

var _authentication_middleware = require("../middleware/authentication_middleware");

var _authorization_middleware = _interopRequireDefault(require("../middleware/authorization_middleware"));

var router = _express["default"].Router();
/* GET home page. */
// router.get('/show/:url', news_controller.show);


router.get('/', [_authentication_middleware.checkToken], _models_controller["default"].index);
module.exports = router;