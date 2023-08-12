const express = require('express')
const router = express.Router()
const categoryModel = require('../models/categoryModel');
const verifyToken = require('../utils/functions');

router.post('/category/postCategory',verifyToken,async(req,res)=>{
    try{
        const {title,price,category,description,image} = req.body
        const categoryData = await categoryModel.create({
           title: title,
           price:price,
           category: category,
           description :  description ,
           image:  image
        })
        if(categoryData){
            return res.status(201).json({status:true,data:categoryData})
        }else{
            return res.status(404).json({status:false,message:'something went wrong'})
        }
    }catch(error){
        return res.status(500).json({status:500,error:error.message})
    }
})

router.get('/category/getCategory',verifyToken,async(req,res)=>{
        try{
        const getCategoryData = await categoryModel.find({})
        if(getCategoryData){
            res.json({status:"success", data:getCategoryData})
        }else{
            res.json({status:error, message:"something went wrong"})
        }
    }catch(error){
        res.json({status:error, message:error.message})
    }
})

module.exports = router;