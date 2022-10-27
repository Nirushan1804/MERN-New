const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const FriendModel = require("./models/Friends");

app.use(cors());
app.use(express.json());

//database connection
mongoose.connect("mongodb://localhost:27017/mern-new",
{useNewUrlParser: true});

app.post("/create", async (req, res) => {
    const name = req.body.name
    const age = req.body.age

    const friend = new FriendModel({name:name, age:age});
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

app.put("/update", async (req, res) => {
    const newAge = req.body.newAge
    const id = req.body.id

    try{
        await FriendModel.findById(id, (error, friendToUpdate) => {
            friendToUpdate.age = Number(newAge);
            friendToUpdate.save();
        });
        } catch(err){
        console.log(err);
    }
    res.send("updated");
});


app.listen(3001,()=>{
    console.log("app running on port 3001");
});
