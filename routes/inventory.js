"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _inventory = _interopRequireDefault(require("../controller/inventory"));

var _authentication_middleware = require("../middleware/authentication_middleware");

var _authorization_middleware = _interopRequireDefault(require("../middleware/authorization_middleware"));

var router = _express["default"].Router();
/* GET home page. */
// router.get('/show/:url', news_controller.show);


router.get('/getAll', _inventory["default"].index); // router.post('/',[checkToken,permit('blog')], NewsController.store);

router.get('/item/:slug', _inventory["default"].show);
router.get('/main_page_filter', _inventory["default"].getMainPageFilter);
router.get('/filters', _inventory["default"].getAllFilter); // router.get('/filter/years', NewsController.getAllCarYears);
// router.get('/filter/interior', NewsController.getAllCarInterior);
// router.put('/:id',[checkToken,permit('blog')], NewsController.update);
// router.delete('/:id',[checkToken,permit('blog')], NewsController.destroy);

module.exports = router;