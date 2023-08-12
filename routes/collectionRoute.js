const express = require('express')
const multer = require('multer')
const collectionModel = require('../models/collectionModel')
const Router = express.Router()



const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./collectionUploads')
    },
    filename:function(req,file,cb){
        console.log(file)
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage})
Router.post('/collection/upload',upload.single('image'),async(req,res)=>{
    try{    
            const uploadData = await collectionModel.create({
                collectionName: req.body.collecName,
                collectionImage :req.file.filename
            })
            if(uploadData){
                    res.status(200).json({message:"sucessfully uploaded",data:uploadData})
            }else{
                res.status(400).json*{message:"something went wrong"}
            }
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

Router.get('/collection/getCollections',async(req,res)=>{
    try{
        const getCollection = await collectionModel.find();
        if(getCollection){
            res.status(200).json({data:getCollection,message:"sucessfully get"})
        }else{
            res.status(404).json({message:"something went wrong"})
        }
    }catch(error){
        res.status(500).json({error:error})
    }
})

Router.delete('/collection/remove/:collectionName',async(req,res)=>{
    console.log(req.params.collectionName)
    // try{
    //     const deletedata = await collectionModel.deleteOne({collectionName:req.params.collectionName})
    // }catch(error){

    // }
})

module.exports = Router