const mongoose = require("mongoose");

const StriverData = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true
    },
    
    problemId: {
        type: String,
        required: true
    },
    
    title: {
        type: String,
        required: true
    },
    
    code:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    comments:{
        type:String,
    },
    quesNumber: {
        type:Number,
        required:true
    },
    level: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true
    },solvedAt: {
        type: Date,
        default: Date.now
    },
    link:{
        type: String,
        trim: true
    }
});

StriverData.index({ username: 1, problemId: 1 }, { unique: true });

const striverDB = mongoose.model("StriverData",StriverData);

module.exports = striverDB;