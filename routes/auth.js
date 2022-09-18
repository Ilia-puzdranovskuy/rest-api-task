const Router = require('express');
const { check } = require('express-validator');
const router = new Router();
const controller = require("../controllers/authcontroller")

router.post('/users', [
    check('name', "Name should be not empty.").notEmpty(),
    check('password', "Title should contain at least 4 characters").isLength({min:4}),
    check('email', 'This is not email').isEmail()
], controller.register)

router.post('/sessions', [
    check('password', "Title should contain at least 4 characters").isLength({min:4}),
    check('email', 'This is not email').isEmail()
], controller.login)


router.get('/users/me',controller.getCurentUser)


module.exports = router