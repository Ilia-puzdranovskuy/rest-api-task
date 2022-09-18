const Router = require('express');
const { check } = require('express-validator');
const router = new Router();
const controller = require("../controllers/itemscontroller");

router.post('/items', [
    check('title', " Cannot be empty").notEmpty(),
    check('price', "Invalid price format").custom(value => {
        let pattern = /[0-9]+.[0-9]{2}$/;
        console.log(pattern.test(value))
        if(pattern.test(value)){
            return new Error("Invalid price format")
        }
    })
], controller.createItem);

router.get('/items', controller.serchItem);

router.get('/items/:id', controller.getItemById);

router.put('/items/:id',[
    check('title', " Cannot be empty").optional().notEmpty(),
    check('price', "Invalid price format").optional().custom(value => {
        let pattern = /[0-9]+.[0-9]{2}$/;
        console.log(pattern.test(value))
        if(pattern.test(value)){
            return new Error("Invalid price format")
        }
    })
], controller.updateItem);

router.delete('/items/:id', controller.deleteItem);

module.exports = router;