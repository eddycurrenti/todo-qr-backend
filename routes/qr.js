const express = require("express");
const route = express.Router();
const QRCode = require('qrcode');

route.post("/getUrl", async (req,res)=>{
    const { URL } = req.body;
    try{
        if(!URL){
            console.log("URL ni mila abhi tak");
            return res.status(400).send("URL ni mila abhi tak");
        }
        const ORImage = await QRCode.toDataURL(URL);
        console.log("QR genrated");
        return res.status(200).send(ORImage);
    }catch(e){
        console.log(e);
    }

});

module.exports = route;