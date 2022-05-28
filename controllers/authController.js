const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const {validationResult} = require('express-validator')


const GenerateAccessToken = (id,roles)=>{
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload,process.env.secret,{expiresIn:"24h"})
}


class authController{
    async registration(req,res){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:'Ошибка при регистрации',errors})
            }
           const {username,password} = req.body
           const  candidate = await User.findOne({username})
           if(candidate){
               return res.status(400).json({message:'no uniqie user'})
           }
           const hashPassword = bcrypt.hashSync(password,7)
           const userRole = await Role.findOne({value:'USER'})
           const user = new User({username,password:hashPassword,roles:[userRole.value]})
           await user.save()
           return res.json({message:'Success registration'})
        } catch (error) {
            console.log(error)
        res.status(400).json({message:'regisration error'})
        }
    }


    async login(req,res){
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(404).json({message:'Пользователь не найден'})
            }
            const validPassword = bcrypt.compareSync(password,user.password)
            if(!validPassword){
                return res.status(404).json({message:'Пароль не верен'})
            }
            const token = GenerateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (error) {
            console.log(error)
        res.status(400).json({message:'login error'})
        }
    }


    async getUsers(req,res){
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log('error')
        }
    }

    async getUserName(req,res){
        const token = req.headers.authorisation.split(' ')[1]
        const decodedData = jwt.verify(token,process.env.secret)
        const user = await User.findOne({_id:decodedData.id})
        if(user){
            res.json(user.username)
        }else{
            res.staus(400).json({message:'Токен устарел'})
        }
    }
}


module.exports = new authController()