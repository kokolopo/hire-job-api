const portofolioController = require("../controllers/portofolioController");
const { uploadImages } = require("../middleware/uploadImage");
const { isWorker, isRecruter } = require("../middleware/verifyToken");
const express = require("express");
const portofolio = express.Router();

portofolio.post(
  "/",
  uploadImages.single("image"),
  isWorker,
  portofolioController.addPortofolio
);

portofolio.get(
  "/:worker_id",
  isRecruter,
  portofolioController.workerPortofolios
);

portofolio.get("/", isWorker, portofolioController.ownPortofolios);

module.exports = portofolio;
