const bcrypt = require("bcryptjs");
const express = require ("express");
const route = express.Router();
const userDb = require("../DB/user");
const middleware = require("../auth");
const userDB = require("../DB/user");
route.post("/createnewUser",async (req,res)=>{
    try{
        const { username, password , name} = req.body;
        if(!username || !password || !name){
            console.log("username or pass  or name is missing");
            return res.status(400).json({Message : " SOme thing is missing"});
        }


        const userrr = await userDb.findOne({ username });
        if(userrr){
            console.log("User already exists");
            return res.send.status(400).json({message : "This user already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const db = await userDb.create({username, password: hashedPassword , name});

        console.log(`${username} is created`);
        return res.status(200).send("user created succsesfulkly");
    }catch(e){
        console.log(e);
    }
});

route.get("/getUser", middleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const data = await userDB.findById(userId)
                                 .select("name username");

        if (!data) {
            return res.status(404).json({ message: "User does not exist" });
        }

        return res.status(200).send(data.name);

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});




module.exports = route;