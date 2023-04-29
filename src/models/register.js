const mongoose = require("mongoose");

const newUser = mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const Rmodel = mongoose.model("users",newUser);

module.exports = Rmodel;