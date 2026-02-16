const express = require("express");
const route = express.Router();
const projectBD = require("../DB/projectDB");

const middle = require("../auth");

route.get("/getProjects", middle, async (req, res) => {
    try {
        const data = await projectBD.find({ user: req.user.id });
        if (data.length === 0) {
            return res.status(404).json({ message: "No projects found" });
        }
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({ message: "Server error" });
    }
});

route.post("/addnew", middle, async (req, res) => {
    try {
        const {
            name,
            description,
            techStack,
            startDate,
            completedDate,
            status,
            deploymentStatus,
            liveURL,
            backendURL,
            githubFront,
            githubBackend
        } = req.body;

        if (!name || !description || !techStack || !startDate) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        if (status === "Completed" && !completedDate) {
            return res.status(400).json({ message: "Completed date required" });
        }

        const project = await projectBD.create({
            user: req.user.id,
            name,
            description,
            techStack,
            startDate: new Date(startDate),
            completedDate: completedDate ? new Date(completedDate) : null,
            status,
            deploymentStatus,
            liveURL,
            backendURL,
            githubFront,
            githubBackend
        });

        return res.status(201).json({message: "Project created successfully",project});

    } catch (e) {
        return res.status(500).json({ message: "Server error" });
    }
});


route.patch("/update/:id", middle, async (req, res) => {
    try {

        const projectId = req.params.id;
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ message: "Invalid project ID" });
        }

        const updateFields = { ...req.body };

        if (updateFields.startDate) {
            updateFields.startDate = new Date(updateFields.startDate);
        }

        if (updateFields.completedDate) {
            updateFields.completedDate = new Date(updateFields.completedDate);
        }
        
        if (updateFields.status === "Completed" && !updateFields.completedDate) {
            return res.status(400).json({
                message: "Completed date required when status is Completed"
            });
        }

        const updatedProject = await projectBD.findOneAndUpdate(
            { _id: projectId, user: userId },   // user security
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        return res.status(200).json({
            message: "Project updated successfully",
            updatedProject
        });

    } catch (e) {
        return res.status(500).json({ message: "Server error" });
    }
});


module.exports = route;