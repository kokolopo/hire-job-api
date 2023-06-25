const express = require("express");
const routes = express.Router();

const workers = require("./workerRoute");
const recruters = require("./recruterRoute");
const skill = require("./skillRoute");
const portofolio = require("./portofolioRoute");
const experience = require("./experienceRoute");
const hiring = require("./hiringRoute");

routes.use("/workers", workers);
routes.use("/recruters", recruters);
routes.use("/skills", skill);
routes.use("/portofolios", portofolio);
routes.use("/experiences", experience);
routes.use("/hirings", hiring);

module.exports = routes;
