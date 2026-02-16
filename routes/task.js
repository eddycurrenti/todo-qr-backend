const express = require("express");
const route = express.Router();
const model = require("../DB/database");

const mongoose = require("mongoose");
const middleware = require("../auth");
route.post("/taskCreate",middleware,async (req,res)=>{
    const userId = req.user.id;
    const { title , createTime} = req.body;
    try{
        if(!userId || !title || !createTime){
            return res.status(400).json({message: "title or time is missing"});
        }
        const tata = await model.create({user: userId , title , createTime});
        return res.status(200).send("recived");
    }catch(e){
        console.log(e);
    }
});

route.get("/getAllTask" , middleware,async (req,res)=>{
    try{
        const userId = req.user.id;
        const data = await model.find({user:userId}); 
        console.log("DATA RECIEVED FROM dataBase");
        return res.status(200).send(data);
    }catch(e){
        console.log(e);
    }
});


route.delete("/deleteTask",middleware ,async (req,res)=>{
    const userId = req.user.id;
    const {id} = req.body;
    try{
        if(!id){
            return res.status(400).send("Task id missing");
        }
        const data = await model.findOneAndDelete({_id:id , user: userId });
        if(!data){
            console.log("Data ni mila muzhe");
            return res.status(200).json({message : `${id} does not exist`});
        }
        res.status(200).send("Data is deleted");
        console.log(`${id} is deleted`);        
    }catch(e){
        console.log(e);
        return res.status(500).send("server error");
    }
});


module.exports = route;


