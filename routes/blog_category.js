import express from 'express'
import NewsController from '../controller/blog_category_controller'
import {checkToken} from "../middleware/authentication_middleware";
import permit from "../middleware/authorization_middleware";
const router = express.Router();

/* GET home page. */
// router.get('/show/:url', news_controller.show);
router.get('/', NewsController.index);
router.post('/',[checkToken,permit('blog-category')], NewsController.store);
router.get('/:slug', NewsController.show);
router.put('/:slug',[checkToken,permit('blog-category')], NewsController.update);
router.delete('/:id',[checkToken,permit('blog-category')], NewsController.destroy);
module.exports = router;
