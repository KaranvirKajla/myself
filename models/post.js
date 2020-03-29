const mongoose = require("mongoose");
const Member = require("./member");
const Comment = require("./comment");
let postSchema = new mongoose.Schema({
  creator:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "Member"
  },
  title:{
      type:String,
  },
  link:{
      type:String
  },
  description:{
      type:String,
  },
  date:{
      type:String,
      default: new Date(),
  },
  likes:{
      type:Number
  },
  comments:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comment"
  }]
  
})

module.exports= mongoose.model("Post",postSchema);

