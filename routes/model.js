import express from 'express'
import ModelController from '../controller/models_controller'
import {checkToken} from "../middleware/authentication_middleware";
import permit from "../middleware/authorization_middleware";

const router = express.Router();

/* GET home page. */
// router.get('/show/:url', news_controller.show);
router.get('/',[checkToken], ModelController.index);

module.exports = router;
