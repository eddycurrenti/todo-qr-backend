const mongoose = require("mongoose");

const model = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true
        },
    title:{
    type : String,
    required : true
    },
    createTime : {
        type:String,
        required : true
    }
})

const Task = mongoose.model("Task", model);

module.exports = Task;