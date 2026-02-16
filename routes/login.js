const express = require("express");
const route = express.Router();
const userDB = require("../DB/user");
const jwt = require("jsonwebtoken");
const middleware = require("../auth");
const bcrypt = require("bcryptjs");

route.post("/login", async (req,res)=>{
    try{
        const { username , password} = req.body;
        const user = await userDB.findOne({username});

        
        if(!user){
            return res.status(400).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send("Invalid cridentialss");
        }

        const token = jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.json({ token });
    }catch(e){
        console.log(e);
        res.status(401).send(e);
    }
});


route.get("/user", middleware, (req, res) => {
    res.status(200).json({
        message: "Verified user",
        user: req.user
    });
});


module.exports = route;