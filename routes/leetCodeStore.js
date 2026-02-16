const express = require("express");
const route = express.Router();
const store = require("../DB/StriverSheet");
const mongoose = require("mongoose");

const auth = require("../auth");
route.post("/send", auth ,async (req,res)=>{
    const { problemId, title, code, category, comments,quesNumber, level,link} = req.body;
    try{
        const userId = req.user.id;
        if(!userId || !problemId || !title || !code || !category || !quesNumber || !level){
            return res.status(400).send("Data is missing");
        }
        
        const data = await store.create({user: userId , problemId, title, code, category, comments,quesNumber, level,link});
        
        return res.status(200).send("saved");
    }catch(e){
        if (e.code === 11000) {
            return res.status(409).json({ message: "Problem already exists" });
        }
        return res.status(404).send(e);
    }
});


route.get("/user", auth ,async (req,res)=>{
    const userId = req.user.id;
    try{
        const data = await store.find({user : userId});
        if(data.length === 0){
            return res.status(400).send("data does not exist");
        }
        return res.status(200).json(data);
    }catch(e){
        return res.status(500).send(e);
    }
});

route.get("/heatmap", auth, async (req, res) => {
    const userId = req.user.id;

    try {
        const submissions = await store.find({ user: userId });

        if (submissions.length === 0)
            return res.json({ data: [], startDate: null });

        const firstDate = submissions
            .map(s => s.solvedAt)
            .sort((a, b) => a - b)[0];

        const grouped = await store.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: {
                        year: { $year: "$solvedAt" },
                        month: { $month: "$solvedAt" },
                        day: { $dayOfMonth: "$solvedAt" }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            data: grouped,
            startDate: firstDate
        });

    } catch (e) {
        res.status(500).send(e);
    }
});



module.exports = route;