import express from 'express'
import NewsController from '../controller/language_controller'
import AuthenticationMiddleware, {checkToken} from '../middleware/authentication_middleware'
import permit from "../middleware/authorization_middleware";
const router = express.Router();

/* GET home page. */
// router.get('/show/:url', news_controller.show);
router.get('/', NewsController.index);
router.post('/',[checkToken,permit('language')], NewsController.store);
router.get('/:id', NewsController.show);
router.put('/:id',[checkToken,permit('language')], NewsController.update);
router.delete('/:id',[checkToken,permit('language')], NewsController.destroy);

module.exports = router;
