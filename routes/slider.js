import express from 'express'
import sliderController from '../controller/slider_controller'
import AuthenticationMiddleware, {checkToken} from '../middleware/authentication_middleware'
// import NewsController from "../controller/blog_controller";
import permit from "../middleware/authorization_middleware";
const router = express.Router();

/* GET home page. */
// router.get('/show/:url', news_controller.show);
router.get('/', sliderController.index);
router.post('/',[checkToken,permit('slider')], sliderController.store);
router.get('/:id', sliderController.show);
router.put('/:id',[checkToken,permit('slider')], sliderController.update);
router.delete('/:id',[checkToken,permit('slider')], sliderController.destroy);
module.exports = router;
