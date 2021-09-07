"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _image_controller = _interopRequireDefault(require("../controller/image_controller"));

var _authentication_middleware = require("../middleware/authentication_middleware");

var _authorization_middleware = _interopRequireDefault(require("../middleware/authorization_middleware"));

// import NewsController from "../controller/blog_controller";
var router = _express["default"].Router();

router.post("/", [_authentication_middleware.checkToken], _image_controller["default"].upload);
router.get("/", [_authentication_middleware.checkToken], _image_controller["default"].index);
router["delete"]('/:id', [_authentication_middleware.checkToken], _image_controller["default"].destroy);
module.exports = router;