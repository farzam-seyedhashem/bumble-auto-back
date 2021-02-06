import express from 'express'
import controller from '../controller/image_controller'
import {checkToken} from "../middleware/authentication_middleware";
import permit from "../middleware/authorization_middleware";
// import NewsController from "../controller/blog_controller";
const router = express.Router();


router.post("/",[checkToken], controller.upload);
router.get("/",[checkToken], controller.index);
router.delete('/:id',[checkToken], controller.destroy);
module.exports = router;
