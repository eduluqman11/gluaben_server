const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerModel = new Schema({
    username : {type:String,required:[true,'username is required'],unique:true},
    email : {type: String,required:[true,'email is required'],unique:true},
    password:{type:String,required:[true,'password is required']},
 
})
const registerSchema = mongoose.model('register',registerModel)
module.exports = registerSchema


