const jwt = require("jsonwebtoken");
const userDB = require("./DB/user");

const middleware = async (req,res,next)=>{
    let token;

    if(req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return res.status(401).json({ message: "Not authorized"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await userDB.findById(decoded.id).select("-password");
        next();
    }
    catch(error){
    console.log(error);
    res.status(401).send("token invlaid");
}};

module.exports = middleware;