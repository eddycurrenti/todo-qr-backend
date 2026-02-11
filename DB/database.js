const mongoose = require("mongoose");

const model = new mongoose.Schema({
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