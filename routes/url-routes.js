"use strict"

const express = require("express");
const urlRouter = express.Router();

const UrlController = require("../controllers/url-controller");
let Controller = new UrlController();

urlRouter.get("/:id", Controller.getUrl);

urlRouter.delete("/:id", Controller.delete);

module.exports = urlRouter;