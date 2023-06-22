const express = require("express");
const workerController = require("../controllers/workerController");
const { verifyToken } = require("../middleware/verifyToken");
const workers = express.Router();

workers.get("/", verifyToken, workerController.listWorker);
workers.get("/:worker_id", verifyToken, workerController.detailWorker);
workers.post("/register", workerController.register);
workers.post("/login", workerController.login);
workers.put("/profile", verifyToken, workerController.editDetail);

module.exports = workers;
