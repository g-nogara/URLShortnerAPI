"use strict"

const express = require("express");
const statsRouter = express.Router();

const StatsController = require("../controllers/stats-controller");
let Controller = new StatsController();

statsRouter.get("/", Controller.getAll);

statsRouter.get("/:id", Controller.getByUrlId);

module.exports = statsRouter;