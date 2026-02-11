const express = require("express");
const route = express.Router();

route.post("/gpa2", (req,res)=>{
    const { subjects } = req.body;

    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
        return res.status(400).json({
            message: "kuch bhi mat bhejo pls"
        });
    }

    let totalCredits = 0;
    let totalpointe = 0;

    for(let subject of subjects){
        if(typeof subject.grade !== "number" ||typeof subject.credit !== "number"){
            return res.status(400).send("number dal na yarr");
        }

        if(!subject.grade || !subject.credit){
            return res.status(400).json("kuch bhul rahe ho lala");
        }

        if(subject.grade > 10 || subject.grade < 0){
            return res.status(400).send(`${subject.grade} should be less than or equal to 10 and more than 0`);
        }
        
        if(subject.credit > 4 || subject.grade < 0){
            return res.status(400).send(`${subject.grade} should be less than or equal to 4 and more than 0`);
        }
        
        totalpointe += subject.grade * subject.credit;
        totalCredits += subject.credit;
    }

    if (totalCredits === 0) {
        console.log("Credits 0 hain");
        return res.status(400).json({message: "Total credits must not  be zero"});
    }

    const gpa = totalpointe / totalCredits;

    return res.status(200).send(gpa);
});

module.exports = route;