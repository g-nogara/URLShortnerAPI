"use strict"

const express = require("express");
const userRouter = express.Router();

require("../models/users-model");
const userModel = mongoose.model("userModel");

const UserController = require("../controllers/user-controller");
let Controller = new UserController();

userRouter.get("/:userid/stats", Controller.getUserStats);

userRouter.post("/:userid/urls", Controller.postUrl);

userRouter.post("/", Controller.postUser);

userRouter.delete("/:userid", Controller.delete);

//Debug route, use it to get all users, REMOVE IF YOU WILL USE THIS FOR PRODUCTION
userRouter.get("/", async (req,res) => {
    const result = await userModel.find();
    res.status(200).send(result);
})

module.exports = userRouter;