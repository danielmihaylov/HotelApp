const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new mongoose.Schema({
    categoryName:{type:String,required:true,unique:true},
    hotels:[{type:ObjectId,ref:'Hotel'}]
})

let Category = mongoose.model('Category',categorySchema);

module.exports = Category;