const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const recruterController = require("../controllers/recruterController");
const recruter = express.Router();

recruter.post("/register", recruterController.register);
recruter.post("/login", recruterController.login);

module.exports = recruter;
