"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _blog_controller = _interopRequireDefault(require("../controller/blog_controller"));

var _authentication_middleware = require("../middleware/authentication_middleware");

var _authorization_middleware = _interopRequireDefault(require("../middleware/authorization_middleware"));

var router = _express["default"].Router();
/* GET home page. */
// router.get('/show/:url', news_controller.show);


router.get('/', _blog_controller["default"].index);
router.post('/', [_authentication_middleware.checkToken, (0, _authorization_middleware["default"])('blog')], _blog_controller["default"].store);
router.get('/:slug', _blog_controller["default"].show);
router.put('/:id', [_authentication_middleware.checkToken, (0, _authorization_middleware["default"])('blog')], _blog_controller["default"].update);
router["delete"]('/:id', [_authentication_middleware.checkToken, (0, _authorization_middleware["default"])('blog')], _blog_controller["default"].destroy);
module.exports = router;