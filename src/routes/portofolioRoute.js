const portofolioController = require("../controllers/portofolioController");
const { uploadImages } = require("../middleware/uploadImage");
const { isWorker } = require("../middleware/verifyToken");
const express = require("express");
const portofolio = express.Router();

portofolio.post(
  "/",
  uploadImages.single("image"),
  isWorker,
  portofolioController.addPortofolio
);

module.exports = portofolio;
