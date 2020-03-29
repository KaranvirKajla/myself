const express = require("express");
const app= express();
const bodyParser= require("body-parser")
const mongoose = require("mongoose");
const Person = require("./models/person");
const Member = require("./models/member");
const Message = require("./models/message");
const Post = require("./models/post");
const Comment = require("./models/comment");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());


app.get("/",function(req,res){
    res.render("index.ejs");
})
app.get("/myStory",function(req,res){
    res.render("myStory.ejs");
})

app.get("/blog",function(req,res){
    Post.find({}).populate("creator").exec(function(err,posts){
        if(err){console.log(err)}else{
            res.render("blog.ejs",{posts:posts})
        }
    })
    
})

app.get("/coaching",function(req,res){
    res.render("coaching.ejs")
})
app.get("/speaking",function(req,res){
    res.render("speaking.ejs");
})

app.get("/signUp",function(err,res){
    res.render("signUp.ejs")
})

app.post("/signUp",function(req,res){
    let email = req.body.email;
    let password = req.body.password;
    Person.create({email:email,password:password,send:[],receive:[],login:false},function(err,person){
        if(err){console.log(err);}else{
            console.log(person);
            res.redirect("/");
        }
        
    })
})
app.post("/login",function(req,res){
    let email = req.body.email;
    let password = req.body.password;
    console.log("loginloginloginloginloginloginloginloginloginloginloginloginloginloginlogin",email,password)
    Person.findOneAndUpdate({email:email},{login:true},function(err,person){
        if(err){console.log(err);}else{
            console.log(person);
            res.redirect("/home/"+person._id)
        }
    })
})
app.get("/home/:id",function(req,res){
    let id = req.params.id;
     Person.findOne({_id:id}).populate("send").populate("receive").exec(function(err,foundPerson){
         if(err){console.log(err);}else{
             res.render("home.ejs",{person:foundPerson})
         }
     })
    
})











app.get("/teamSignUp",function(req,res){
   res.render("teamSignUp.ejs");
})
app.post("/teamSignUp",function(req,res){
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    Member.create({email:email,name:name,password:password,send:[],receive:[],login:false,blogs:[]},function(err,member){
        if(err){console.log(err);}else{
            console.log(member);
            res.redirect("/teamLogin");
        }
    })
})

app.get("/teamLogin",function(req,res){
    res.render("teamLogin.ejs");
})

app.post("/teamLogin",function(req,res){
    let email = req.body.email;
    let password = req.body.password;
     Person.find({}).sort({_id:-1}).limit(1).exec(function(err,docs){
        if(err){console.log(err)}else{
            console.log("docsdocsdocsdocsdocsdocsdocsdocsdocsdocsdocsdocsdocsdocsdocsdocsdocsdocs",docs);
        
            Member.findOneAndUpdate({email:email},{login:true},function(err,foundMember){
                if(err){console.log(err);}else{
                    console.log(foundMember);
                    res.redirect("/teamHome/"+foundMember._id+"/undefined");
                }
            })
        }
    });
  
})

app.get("/teamHome/:id/:pid",function(req,res){
    let id = req.params.id;
    let pid = req.params.pid;
    if(pid==="undefined"){
        console.log("ififififififififififififififififififififififififififififififififififififififififif")
        Member.findOne({_id:id},function(err,found){
            if(err){console.log(err);}else{
                Person.find({},function(err,persons){
                    if(err){console.log(err);}else{
                        res.render("teamHomeHome.ejs",{member:found,persons:persons});
                    }
                })
               
            }
        })
    }
    else{
        console.log("elseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelseelse")
        Member.findOne({_id:id}).populate("send").populate("receive").exec(function(err,found){
        if(err){console.log(err)}else{
            console.log(found);
            Person.find({},function(err,persons){
                if(err){console.log(err);}else{
                    Person.findOne({_id:pid}).populate("send").populate("receive").exec(function(err,foundPerson){
                        if(err){console.log(err)}else{
                            console.log("foundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPersonfoundPerson",found)
                            res.render("teamHome.ejs",{member:found,person:foundPerson,persons:persons})
                        }
                    })
                  
                }
            })
           
        }
    })
}
    
})

// function getMemberWithLeastReceiveSize(arr){
//     console.log("arrarrarrarrarrarrarrarrarrarrarrarrarrarrarr",arr)
//     let arrSize = 99999;
//     let member=null;
//     for(i=0;i<arr.length;i++){
//         if(arr[i].receive.length<arrSize){
//             arrSize= arr[i].receive.length;
//             member=arr[i];
//         }
//     }
//     console.log("membermembermembermembermembermembermembermembermembermembermembermembermembermember",member)
//     return member;
// }

app.post("/message",function(req,res){
    let pid = req.body.pid;
    let message = req.body.message;

Message.create({message:message,time:new Date().getTime()},function(err,message){
    if(err){console.log(err);}else{
        Person.findOne({_id:pid},function(err,foundPerson){
            if(err){console.log(err);}else{
                foundPerson.send.push(message);
                foundPerson.save(function(err,data){
                    if(err){console.log(err);}else{
                        console.log(data);

                        res.redirect("/home/"+pid)

                       



                    }
                })
            }
        })
    }
})
    
})



app.post("/teamMessage",function(req,res){
    let id  = req.body.id;
    let pid = req.body.pid;
    let message= req.body.message;
    Message.create({message:message},function(err,message){
        if(err){console.log(err);}else{
            console.log(message);

                          
                            Person.findOne({_id:pid},function(err,foundPerson){
                                if(err){console.log(err);}else{
                                    foundPerson.receive.push(message);
                                    foundPerson.save(function(err,data){
                                        if(err){console.log(err);}else{
                                            console.log(data);
                                            res.redirect("/teamHome/"+id+"/"+pid)
                                        }
                                    })
                                }
                            })
                
                
            
        }
    })
  
})

app.get("/createPost/:id",function(req,res){
    let id = req.params.id;
    Member.findOne({_id:id},function(err,found){
        if(err){console.log(err);}else{
            res.render("createPost.ejs",{member:found});
        }
    })
   
})

app.post("/createPost",function(req,res){
    let id = req.body.id;
    let title = req.body.title;
    let description = req.body.description;
    let link = req.body.link;
    console.log(title,description);
    
    Post.create({title:title,description:description,link:link,creator:id},function(err,post){
        if(err){console.log(err);}else{
            Member.findOne({_id:id},function(err,found){
                if(err){console.log(err);}else{
                    found.posts.push(post);
                    found.save(function(err,data){
                        if(err){console.log(err)}else{
                            console.log(data);
                            res.redirect("/postHome/"+id);
                        }
                    })
                }
            })
        }
    })
   
})


app.get("/postHome/:id",function(req,res){
    let id = req.params.id;
    Member.findOne({_id:id}).populate("posts").exec(function(err,found){
        if(err){console.log(err);}else{
            res.render("postHome.ejs",{member:found});
        }
    })
    
})



app.get("/blog/:postId",function(req,res){
    let postId = req.params.postId
    Post.findOne({_id:postId}).populate("creator").exec(function(err,foundPost){
        if(err){console.log(err);}else{
            res.render("post.ejs",{post:foundPost});
        }
    })
   
})


app.get("/blog/:pid/:postId",function(req,res){
    let pid = req.params.pid;
    let postId = req.params.postId;
    Post.findOne({_id:postId}).populate("comments").populate("creator").exec(function(err,foundPost){
        if(err){console.log(err);}else{
            res.render("personPost.ejs",{post:foundPost,pid:pid});
        }
    })
    
})

app.post("/postLogin",function(req,res){
    let email = req.body.email;
    let password = req.body.password;
    let postId = req.body.postId;
    console.log("loginloginloginloginloginloginloginloginloginloginloginloginloginloginlogin",email,password,postId)
    Person.findOneAndUpdate({email:email},{login:true},function(err,person){
        if(err){console.log(err);}else{
            console.log(person);
            res.redirect("/blog/"+person._id+"/"+postId);
        }
    })
})

app.post("/comment",function(req,res){
    let pid = req.body.pid;
    let postId = req.body.postId;
    let comment = req.body.comment;
    Comment.create({description:comment,creator:pid},function(err,comment){
        if(err){console.log(err);}else{
            Post.findOne({_id:postId},function(err,foundPost){
                if(err){console.log(err);}else{
                    foundPost.comments.push(comment);
                    foundPost.save(function(err,data){
                        if(err){console.log(err);}else{
                            console.log(data);
                            res.redirect("/blog/"+pid+"/"+postId);
                        }
                    })
                }
            })
        }
    })
})



app.get("/myStory/:pid",function(req,res){
    let pid = req.params.pid;
    res.render("personMyStory.ejs",{pid:pid})
})

app.get("/coaching/:pid",function(req,res){
    let pid = req.params.pid;
    res.render("personCoaching.ejs",{pid:pid})
})

app.get("/speaking/:pid",function(req,res){
    let pid = req.params.pid;
    res.render("personSpeaking.ejs",{pid:pid})
})


























mongoose.connect("mongodb://localhost:27017/myself").then(()=>{
    app.listen(3000,function(){
        console.log("Server started")
    })
})
