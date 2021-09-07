"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _role_controlller = _interopRequireDefault(require("../controller/role_controlller"));

var _authentication_middleware = _interopRequireWildcard(require("../middleware/authentication_middleware"));

var _authorization_middleware = _interopRequireDefault(require("../middleware/authorization_middleware"));

var router = _express["default"].Router();
/* GET home page. */
// router.get('/show/:url', news_controller.show);


router.get('/', [_authentication_middleware.checkToken, (0, _authorization_middleware["default"])('role')], _role_controlller["default"].index);
router.post('/', [_authentication_middleware.checkToken, (0, _authorization_middleware["default"])('role')], _role_controlller["default"].store);
router.get('/:id', [_authentication_middleware.checkToken, (0, _authorization_middleware["default"])('role')], _role_controlller["default"].show);
router.put('/:id', [_authentication_middleware.checkToken, (0, _authorization_middleware["default"])('role')], _role_controlller["default"].update);
router["delete"]('/:id', [_authentication_middleware.checkToken, (0, _authorization_middleware["default"])('role')], _role_controlller["default"].destroy);
module.exports = router;