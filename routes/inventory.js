import express from 'express'
import NewsController from '../controller/inventory'
import {checkToken} from '../middleware/authentication_middleware'
import permit from '../middleware/authorization_middleware'
const router = express.Router();
/* GET home page. */
// router.get('/show/:url', news_controller.show);
router.get('/getAll', NewsController.index);
// router.post('/',[checkToken,permit('blog')], NewsController.store);
router.get('/item/:slug', NewsController.show);
router.get('/main_page_filter', NewsController.getMainPageFilter);
router.get('/filters', NewsController.getAllFilter);
// router.get('/filter/years', NewsController.getAllCarYears);
// router.get('/filter/interior', NewsController.getAllCarInterior);
// router.put('/:id',[checkToken,permit('blog')], NewsController.update);
// router.delete('/:id',[checkToken,permit('blog')], NewsController.destroy);

module.exports = router;
