const mongoose = require('mongoose');
const Schema = mongoose.Schema

const categoryModel = new Schema({
    title:{type:String,required:[true,'name is require']},
    price:{type:String,required:[true,'name is require']},
    category:{type:String, required:[true,'category is required']},
    description:{type:String},
    image:{type:String, required:[true,'image is required']},
})
const Category= mongoose.model("Category",categoryModel)
module.exports = Category