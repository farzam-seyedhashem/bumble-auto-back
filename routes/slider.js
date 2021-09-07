"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _slider_controller = _interopRequireDefault(require("../controller/slider_controller"));

var _authentication_middleware = _interopRequireWildcard(require("../middleware/authentication_middleware"));

var _authorization_middleware = _interopRequireDefault(require("../middleware/authorization_middleware"));

// import NewsController from "../controller/blog_controller";
var router = _express["default"].Router();
/* GET home page. */
// router.get('/show/:url', news_controller.show);


router.get('/', _slider_controller["default"].index);
router.post('/', [_authentication_middleware.checkToken, (0, _authorization_middleware["default"])('slider')], _slider_controller["default"].store);
router.get('/:id', _slider_controller["default"].show);
router.put('/:id', [_authentication_middleware.checkToken, (0, _authorization_middleware["default"])('slider')], _slider_controller["default"].update);
router["delete"]('/:id', [_authentication_middleware.checkToken, (0, _authorization_middleware["default"])('slider')], _slider_controller["default"].destroy);
module.exports = router;