const mongoose = require("mongoose");
const Message = require("./message")
let personSchema = new mongoose.Schema({
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
    send:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Message"
    }],
    receive:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Message"
    }]
})

module.exports= mongoose.model("Person",personSchema);

