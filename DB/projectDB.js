const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    techStack: {
        type: [String],
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    completedDate: {
        type: Date
    },

    status: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed", "Paused"],
        default: "Not Started"
    },

    deploymentStatus: {
        type: Boolean,
        default: false
    },

    liveURL: {
        type: String,
        trim: true
    },

    backendURL: {
        type: String,
        trim: true
    },

    githubFront: {
        type: String,
        trim: true
    },

    githubBackend: {
        type: String,
        trim: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
