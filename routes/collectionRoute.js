const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const collectionModel = require('../models/collectionModel')
const Router = express.Router()
const verifyToken = require('../utils/functions')



const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./collectionUploads')
    },
    filename:function(req,file,cb){
        console.log(file)
        cb(null,file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.jfif','.avif'];
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(extname)) {
      cb(null, true); 
    } else {
      cb(new Error('Only jpg, jpeg, png, and jfif files are allowed'));
    }
  };

const upload = multer({storage:storage, fileFilter: fileFilter})
Router.post('/collection/upload',upload.single('image'),async(req,res)=>{
    try{    
            const uploadData = await collectionModel.create({
                collectionName: req.body.collectionName,
                collectionImage :req.file.filename
            })
            if(uploadData){
                const imageUrl = `http://localhost:3000/${req.file.filename}`;
                 res.status(200).json({message:"sucessfully uploaded",data:uploadData, image:imageUrl})
            }else{
                res.status(400).json({message:"something went wrong"})
            }
    }catch(error){
        res.status(500).json({error:error.message})
    }
})



Router.get('/collection/images', (req, res) => {
    // Read the 'uploads' directory and send the list of image filenames
    const images = fs.readdirSync('./collectionUploads');
    res.json(images);
  });



Router.get('/collection/getCollections',verifyToken,async(req,res)=>{
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

Router.delete('/collection/remove',verifyToken,async(req,res)=>{
    console.log(req.query.imageName)
    console.log(req.query.id)
    const parentImagDir = path.join(__dirname,'..')
    const imagDir = path.join(parentImagDir,'collectionUploads')
    const imgName = path.join(imagDir,req.query.imageName)
    try{
        const deletedata = await collectionModel.deleteOne({_id:req.query.id})
        if(deletedata){
            fs.unlink(imgName,(err)=>{
                if (err) {
                    console.error('Error deleting file:', err.message);
                } else {
                    console.log('File deleted successfully');
                }
            })
            res.status(200).json({data:deletedata , message:'sucessfully deleted!!'})
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

module.exports = Router
