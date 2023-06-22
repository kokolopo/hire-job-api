const express = require("express");
const hiringController = require("../controllers/hiringController");
const { isRecruter } = require("../middleware/verifyToken");
const hiring = express.Router();

hiring.post("/:worker_id", isRecruter, hiringController.hiring);

module.exports = hiring;
