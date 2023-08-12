const express = require('express');
const router = express.Router();
const resgisterModel = require('../models/registerModel')
const verifyToken = require('../utils/functions')

router.get('/user/~users~',verifyToken,async(req,res)=>{
    try{
        let data = await resgisterModel.find({});
        if(data){
            return res.status(200).json({data:data})
        }else{
            return res.status(404).json({status: '404 Not Found'})
        }
    }catch(err){
        res.status(500).json({status: '500 Internal Server Error',error:err.message})
    }
})

router.get('/user/~getOneUser~/:email',verifyToken,async(req,res)=>{
    try{
        const data = await resgisterModel.findOne({email:req.params.email})
        if(data){
            res.json({status:200,message:"sucessfully find",data:data})
        }else{
            res.json({status:404,message:"something went wrong!!"})
        }
    }catch(err){
        res.status(500).json({error:err})
    }
})

module.exports = router