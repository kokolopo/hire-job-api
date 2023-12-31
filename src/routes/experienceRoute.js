const express = require("express");
const { isWorker } = require("../middleware/verifyToken");
const experienceController = require("../controllers/experienceController");
const experience = express.Router();

experience.post("/", isWorker, experienceController.add);
experience.get("/", isWorker, experienceController.fetchOwnExperience);

module.exports = experience;
