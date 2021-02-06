import express from 'express'
import UserController from '../controller/user_controller'
import {checkToken} from '../middleware/authentication_middleware'
import permit, {checkAuthorize} from '../middleware/authorization_middleware'

const router = express.Router();
const {check, validationResult} = require("express-validator/check");

/* GET home page. */
router.post('/', [check("username", "Please Enter a Valid Username")
    .not()
    .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    }),checkToken,permit('user')], UserController.store)
router.post('/login', [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
], UserController.login)
router.get('/me', [checkToken], UserController.me)
// router.get('/show/:url', news_controller.show);
router.get('/', [checkToken,permit('user')], UserController.index);
// router.post('/', NewsController.store);
router.get('/:id', [checkToken,permit('user')], UserController.show);
// router.put('/:slug', NewsController.update);
// router.delete('/:id', NewsController.destroy);

module.exports = router;
