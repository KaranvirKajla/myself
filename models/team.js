const mongoose = require("mongoose");

let teamSchema = new mongoose.Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Person"
    },
   discription:{
       type:String,
       default:""
   },
   members:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Person"
   }],
  
})

module.exports= mongoose.model("Team",teamSchema);

