const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FriendModel = require("./models/Friends")

//database connection
mongoose.connect("mongodb://localhost:27017/mern-new",
{useNewUrlParser: true});

app.get("/insert", async (req, res) => {
    const friend = new FriendModel({name:"John", age:25});
    await friend.save();
    res.send("inserted data");
});

app.get("/read", async (req, res) => {
    FriendModel.find({}, (err, result) => {
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    });
});


app.listen(3001,()=>{
    console.log("app running on port 3001");
});
