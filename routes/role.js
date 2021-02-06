import express from 'express'
import RoleController from '../controller/role_controlller'
import AuthenticationMiddleware, {checkToken} from '../middleware/authentication_middleware'
import permit from "../middleware/authorization_middleware";
const router = express.Router();

/* GET home page. */
// router.get('/show/:url', news_controller.show);
router.get('/',[checkToken,permit('role')], RoleController.index);
router.post('/',[checkToken,permit('role')], RoleController.store);
router.get('/:id',[checkToken,permit('role')], RoleController.show);
router.put('/:id',[checkToken,permit('role')], RoleController.update);
router.delete('/:id',[checkToken,permit('role')], RoleController.destroy);

module.exports = router;
