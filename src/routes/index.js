const express = require("express");
const routes = express.Router();

const workers = require("./workerRoute");
const recruters = require("./recruterRoute");
const portofolio = require("./portofolioRoute");
const hiring = require("./hiringRoute");

routes.use("/workers", workers);
routes.use("/recruters", recruters);
routes.use("/portofolios", portofolio);
routes.use("/hirings", hiring);

module.exports = routes;
