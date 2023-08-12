const express = require('express');
const router = express.Router()
const register = require('../models/registerModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

 router.post('/auth/~register~',async(req,res)=>{
    try{
        let hashPassword = bcrypt.hashSync(req.body.password,12)
        let data = await register.create({
            username : req.body.username,
            email : req.body.email,
            password:hashPassword
        })
         if(data){
            res.status(201).json({status:201,data:data})
        }else{
            res.status(400).json({status:400,message:"data not created"})
        }
      }catch(err){
       res.status(500).json({status:500,message:"error in server",error:err.message})
      }
 })

 router.post('/auth/~login~',async(req,res)=>{
    try{
        let {email,password} = req.body
        const checkUSer = await register.findOne({email: email})
        if(!checkUSer){
            return  res.status(403).json({message:"user does not exist!"})
        }else{
           let compare= bcrypt.compareSync(password, checkUSer.password);
           if(compare){
            let payload = {user:email}
             let token = jwt.sign({data:payload},process.env.SECRETKEY,{ expiresIn: '1h' })
            return res.status(200).json({message:"sucessfully login",body:req.body.email,status:200,token:token})
           }else{
            return res.status(400).json({message:"password incorrect"})
           }
        }
       
    }catch(err){
        res.status(500).json({message:"error in server",error:err.message})
    }
 })

module.exports = router;