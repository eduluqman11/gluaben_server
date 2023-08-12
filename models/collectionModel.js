const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const collectionModel = new Schema({
    collectionName :{
        type:String,
        required:[true,'collection name is required']
    },
    collectionImage:{
        type : String,
        required : [true,'collection Image is requires']
    }
})

const collectionSchema = mongoose.model('collection',collectionModel)
module.exports = collectionSchema