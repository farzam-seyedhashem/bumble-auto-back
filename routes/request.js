import express from 'express'
import requestController from '../controller/request_controller'
import AuthenticationMiddleware, {checkToken} from '../middleware/authentication_middleware'
import NewsController from "../controller/blog_controller";
import permit from "../middleware/authorization_middleware";
const router = express.Router();

/* GET home page. */
// router.get('/show/:url', news_controller.show);
router.get('/',[checkToken,permit('request')], requestController.index);
router.post('/', requestController.store);
router.get('/:id',[checkToken,permit('request')], requestController.show);
router.put('/:id',[checkToken,permit('request')], requestController.update);
router.delete('/:id',[checkToken,permit('request')], requestController.destroy);
module.exports = router;
