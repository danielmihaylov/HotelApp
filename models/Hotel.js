const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const commentChema = mongoose.model('Comment').schema;


let hotelSchema = new mongoose.Schema({
    title:{type:String,required:true},
    location:{type:String,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String},
    like:[{type:ObjectId,ref:'User'}],
    viewCounter:{type:Number,default:0},
    dateCreation:{type:Date},
    comments:[commentChema]
});

const Hotel = mongoose.model('Hotel',hotelSchema);

module.exports = Hotel;
