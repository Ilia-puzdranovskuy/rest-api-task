const Items = require('../models/items');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const {secret} = require("../secret");
const url = require('url');

class itemController {

    async createItem(req, res) {

        const errors = validationResult(req)
        if (errors.errors.length!=0) {
            return res.status(422).json(errors.errors)
        }
        if (req.headers.authorization==undefined) {
            return res.status(401).json()
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const user = await Users.findOne({_id:decodedData.id});
            if (!token) {
                return res.status(401).json();
            }
            if(user==null){
                return res.status(401).json()
            }
            const item = new Items({title:req.body.title,price:req.body.price,user_id:user._id,user:user,image:req.body.image})
            item.save();
            return res.status(200).json(item)
        } catch (e) {
            if(e.name =="JsonWebTokenError"){
              return  res.status(401).json();
            }
            return res.status(404).json();
 
        }
    }

    async serchItem (req,res){
        const seachParams = url.parse(req.url, true).query;
        try{
            let item 
            if(seachParams.orderBy == "price"){
                if(seachParams.orderType =="asc"){
                    item= await Items.find({$or:[{
                        title:seachParams.title},
                        {user_id:seachParams.userId}]}).sort({price:1})
                }else{
                    item= await Items.find({$or:[{
                        title:seachParams.title},
                        {user_id:seachParams.userId}]}).sort({price:-1})
                }
            }else{
                if(seachParams.orderType =="asc"){
                    item= await Items.find({$or:[{
                        title:seachParams.title},
                        {user_id:seachParams.userId}]}).sort({createdAt:1})
                }else{
                    item= await Items.find({$or:[{
                        title:seachParams.title},
                        {user_id:seachParams.userId}]}).sort({createdAt:-1})
                } 
            }
        return res.status(200).json(item)
    } catch (e) {
        res.status(400).json({message: 'searchError'})
    }
    }

    async getItemById(req,res){
        try{
            let item = await Items.findOne({_id:req.params.id})
            console.log(item)
            if(item==null){
                return res.status(404).json()
            }
            return res.status(200).json(item)
        } catch (e) {
            res.status(404).json()
        }
    }

    async updateItem(req,res){

        const errors = validationResult(req)
        if (errors.errors.length!=0) {
            return res.status(422).json(errors.errors)
        }
        try{
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(403).json()
            }
            const decodedData = jwt.verify(token, secret);
            const user = await Users.findOne({_id:decodedData.id});
            if(user==null){
                return res.status(401).json()
            }
            
            let item = await Items.findByIdAndUpdate(req.params.id,req.body);
            await item.save()
            let updateItem = await Items.findById(req.params.id);
            return res.status(200).json(updateItem)
        } catch (e) {
            if(e.name =="JsonWebTokenError"){
                return  res.status(401).json();
              }
              return res.status(404).json();
        }
    }

    async deleteItem(req,res){
        try{
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(403).json()
            }
            const decodedData = jwt.verify(token, secret);
            const user = await Users.findOne({_id:decodedData.id});
            if(user==null){
                return res.status(401).json()
            }
            let item = await Items.findByIdAndDelete(req.params.id);
       
            return res.status(200).json()
        } catch (e) {
            console.log(e)
            res.status(404).json()
        }
    }

}

module.exports = new itemController();