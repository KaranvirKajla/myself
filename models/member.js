const mongoose = require("mongoose");
const Message = require("./message");
const Post = require("./post");
let memberSchema = new mongoose.Schema({
    login:{
        type:Boolean
    },
    email:{
        unique:true,
        type:String,
     
    },
    password:{
        type:String,
        
    },
    name:{
        type:String
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]
})

module.exports= mongoose.model("Member",memberSchema);

