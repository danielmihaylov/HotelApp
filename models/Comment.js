const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const commentSchema = new mongoose.Schema({
    creator:{type:Object,ref:'User',required:true},
    title:{type:String,required:true},
    description:{type:String},
    creationDate:{type:Date,required:true}
});


let Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;