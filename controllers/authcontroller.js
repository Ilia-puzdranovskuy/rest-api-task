const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const {secret} = require("../secret");

const generateToken = (id, name, password) => {
    const payload = {
        id,
        name,
        password
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async register(req, res) {
        console.log(req.body)
        const errors = validationResult(req)
        if (errors.errors.length!=0) {
            return res.status(422).json(errors.errors)
        }
        try {
            const maybeUser = await Users.findOne({name:req.body.name})
            if (maybeUser) {
                return res.status(422).json({title:"name",message: "A user with that name already exists"})
            }

            const maybeUserEmail = await Users.findOne({email:req.body.email})
            if (maybeUserEmail) {
                return res.status(422).json({message: "A user with that email already exists"})
            }

            const maybeUserPhone = await Users.findOne({phone:req.body.phone})
            if (maybeUserPhone) {
                return res.status(422).json({message: "A user with that phone already exists"})
            }

            const hashPassword = bcrypt.hashSync(req.body.password, 5);
            const user = new Users({name:req.body.name, password: hashPassword,email:req.body.email,phone:req.body.phone})
            await user.save();
            let token = generateToken(user._id,user.name,user.password);

            return res.status(200).json({token: token})
        } catch (e) {
            res.status(422).json({message: 'Register error'})
        }
    }

    async login(req, res) {

        const errors = validationResult(req)

        if (errors.errors.length!=0) {
            return res.status(422).json(errors.errors)
        }
        try {
            const user = await Users.findOne({email:req.body.email})
            if (!user) {
                return res.status(404).json({message: `User is not found`})
            }
            const validPassword = bcrypt.compareSync(req.body.password, user.password)
            if (!validPassword) {
                return res.status(422).json({field:"password",message: `Incorrect password entered`})
            }
            let token = generateToken(user._id,user.name,user.password);
            return res.status(200).json({"token":token})
        } catch (e) {
            res.status(422).json({message: 'Login error'})
        }
    }

    async getCurentUser(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const user = await Users.findOne({_id:decodedData.id});
            if (!token||!user) {
                return res.status(401).json();
            }
            return res.status(200)
            .json({id:user._id,
                phone:user.phone,
                name:user.name,
                email:user.email
            });
        } catch (e) {
            return res.status(401).json();
        }

    }
}

module.exports = new authController();