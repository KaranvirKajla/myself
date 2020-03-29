const mongoose = require("mongoose");
const Message = require("./message");
const Post = require("./post");
const Person = require("./person")
let commentSchema = new mongoose.Schema({
   creator:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Person"
   },
   description:{
       type:String
   },
   date:{
       type:String,
       default: new Date()
   }
})

module.exports= mongoose.model("Comment",commentSchema);

