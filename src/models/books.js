const mongoose = require("mongoose");

const booksData = mongoose.Schema({
    username:{type:String,required:true},
    title:{type:String,required:true},
    author:{type:String,required:true},
    description:{type:String,default:"nice book"},
    publishedDate:{type:String},
    publisher:{type:String},
    genre:{type:String}
})

const Bmodel = mongoose.model("books",booksData);

module.exports = Bmodel;