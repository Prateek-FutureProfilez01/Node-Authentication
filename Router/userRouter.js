const express = require("express");
const userRouter = express.Router();
const {body ,validationResult} = require('express-validator')
const userModel = require('../model/userModel')
const  bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

userRouter.get('/register',(req,res) => {
    res.render("Register")
})

userRouter.post('/register',
    body("email").trim().isEmail(),
    body('name').trim().isLength({min:3}),
    body('password').trim().isLength({min:6}),
    async(req,res) => {
        const error =validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({
                error:error.array(),
                message:"Invalid data"
            })
        }

        const {name,email,password} =req.body
        const hashpassword =await bcrypt.hash(password,10)
            const newuser =new userModel({
                name,
                email,
                password:hashpassword,
            })
            await newuser.save()
            return res.status(200).json(newuser)
});

userRouter.get('/login',(req,res) => {
    res.render('login')
})

userRouter.post('/login',
    body("email").trim().isEmail(),
    body('password').trim().isLength({min:6}),
    async(req,res) => {
        const error = validationResult(req)

        if(!error.isEmpty()){
            res.status(400).json({
                error:error.array(),
                message :"Invalid Data"
            })
        }

    const {email,password} = req.body

    const user = await userModel.findOne({email:email})
    
    if(!user){
        return res.status(400).json({
            message:"Invalid Data"
        })
    }
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.status(400).json({
            message:"Invalid Details"
        })
    }
    // res.status(200).json("Login Successful")
    const token = jwt.sign({
        id:user._id, 
        email: user.email,
        name:user.name
    }
    ,process.env.JWT_SECRET)
     res.cookie("token",token)
    //  res.status(200).json('Loggen In Successfully')
    res.send("Logged In Successfully")
})

module.exports = userRouter;