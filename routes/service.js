import express from 'express'
import NewsController from '../controller/service_controller'
import AuthenticationMiddleware, {checkToken} from '../middleware/authentication_middleware'
import permit from "../middleware/authorization_middleware";
const router = express.Router();

/* GET home page. */
// router.get('/show/:url', news_controller.show);
router.get('/', NewsController.index);
router.post('/',[checkToken,permit('service')], NewsController.store);
router.get('/:slug', NewsController.show);
router.put('/:id',[checkToken,permit('service')], NewsController.update);
router.delete('/:id',[checkToken,permit('service')], NewsController.destroy);

module.exports = router;
