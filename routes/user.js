"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _user_controller = _interopRequireDefault(require("../controller/user_controller"));

var _authentication_middleware = require("../middleware/authentication_middleware");

var _authorization_middleware = _interopRequireWildcard(require("../middleware/authorization_middleware"));

var router = _express["default"].Router();

var _require = require("express-validator/check"),
    check = _require.check,
    validationResult = _require.validationResult;
/* GET home page. */


router.post('/', [check("username", "Please Enter a Valid Username").not().isEmpty(), check("email", "Please enter a valid email").isEmail(), check("password", "Please enter a valid password").isLength({
  min: 6
}), _authentication_middleware.checkToken, (0, _authorization_middleware["default"])('user')], _user_controller["default"].store);
router.post('/login', [check("email", "Please enter a valid email").isEmail(), check("password", "Please enter a valid password").isLength({
  min: 6
})], _user_controller["default"].login);
router.get('/me', [_authentication_middleware.checkToken], _user_controller["default"].me); // router.get('/show/:url', news_controller.show);

router.get('/', [_authentication_middleware.checkToken, (0, _authorization_middleware["default"])('user')], _user_controller["default"].index); // router.post('/', NewsController.store);

router.get('/:id', [_authentication_middleware.checkToken, (0, _authorization_middleware["default"])('user')], _user_controller["default"].show); // router.put('/:slug', NewsController.update);
// router.delete('/:id', NewsController.destroy);

module.exports = router;