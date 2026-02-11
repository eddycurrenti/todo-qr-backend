const express = require("express");
const route = express.Router();

route.post("/cgpa2", (req,res)=>{
    const {oldCredits , oldCGPA , newCredits, newCgpa} = req.body;
    if(!oldCredits || !oldCGPA || !newCredits || !newCgpa){
        console.log("pls fill all the data");
        return res.status(400).send("pls send all the data");
    }


    
    let a = (oldCredits*oldCGPA)  + (newCredits*newCgpa);
    let b = oldCredits + newCredits;
    const cgpa = a / b;
    return res.status(200).send(cgpa);
});

module.exports = route;