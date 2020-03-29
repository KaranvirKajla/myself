const mongoose = require("mongoose");

let messageSchema = new mongoose.Schema({
    message:{
        type:String
    },
  
    date:{
        type:"String",
        default: new Date()
    },
    time:{
        type:Number,
        default: new Date().getTime()
    }
})

module.exports= mongoose.model("Message",messageSchema);

