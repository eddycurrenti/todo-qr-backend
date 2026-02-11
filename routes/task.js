const express = require("express");
const route = express.Router();
const model = require("D:/to-DO+QR/DB/database");
const mongoose = require("mongoose");

route.post("/taskCreate",async (req,res)=>{
    const { title , createTime} = req.body;
    try{
        if(! title || !createTime){
            return res.status(400).json({message: "title or time is missing"});
        }
        const tata = await model.create({title , createTime});
        return res.status(200).send("recived");
    }catch(e){
        console.log(e);
    }
});

route.get("/getAllTask" , async (req,res)=>{
    try{
        const data = await model.find({}); 
        console.log("DATA RECIEVED FROM dataBase");
        return res.status(200).send(data);
    }catch(e){
        console.log(e);
    }
});


route.delete("/deleteTask", async (req,res)=>{
    const {id} = req.body;
    try{
        const data = await model.findByIdAndDelete(id);
        if(!data){
            console.log("Data ni mila muzhe");
            return res.status(200).json({message : `${id} does not exist`});
        }
        res.status(200).send("Data is deleted");
        console.log(`${id} is deleted`);        
    }catch(e){
        console.log(e);
    }
});


module.exports = route;


