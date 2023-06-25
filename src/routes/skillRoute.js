const express = require("express");
const {
  verifyToken,
  isWorker,
  isRecruter,
} = require("../middleware/verifyToken");
const skillController = require("../controllers/skillController");
const skill = express.Router();

skill.post("/", verifyToken, skillController.add);
skill.get("/", isWorker, skillController.ownSkills);
skill.get("/:worker_id", isRecruter, skillController.workerSkills);

module.exports = skill;
