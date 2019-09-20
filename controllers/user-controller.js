require("../models/users-model");
require("../models/urls-model");
const mongoose = require("mongoose");
const userModel = mongoose.model("userModel");
const urlModel = mongoose.model("urlModel");

class UserController {

    async getUserStats (req, res) {
        if (!req.body) res.status(400).send("Bad Syntax: Missing body parameters");
        else {
            const user = await urlModel.find({"userid": req.params.userid});
            if (user) { 
                user.sort((x,y) => y.hits > x.hits)
                res.status(302).send(user)
            }
            else res.status(404).send("User not found");
        }
    }

    async postUrl (req, res) {
        if (!req.body) res.status(400).send("Bad syntax: missing body parameters")
        else {
            let URL = new urlModel();
            URL.url = req.body.url;
            URL.userid = req.params.userid;
            if (req.body.shortUrl) URL.shortUrl = req.body.shortUrl;
            const result = await URL.save()
            res.status(201).send(result);
        }
    }

    async postUser (req, res) {
        if (!req.body) res.status(400).send("Bad syntax: missing body parameters")
        else {
            const userId = Object.keys(req.body);
            const model = new userModel();
            if ( await idIsFree(userId) ) {
                model.name = req.body[userId[0]];
                model.id = userId[0];
                const result = await model.save();
                res.status(201).send(result);
            }
            else {
                res.status(300).send("User id already in use");
            }
        }
        
    }

    async delete (req, res) {
        if(!req.body.userid) res.status(400).send("Bad syntax: missing paramenter 'userid'")
        else {
            await userModel.findOneAndDelete(req.body);
            res.status(204);
        }

    }
}

async function idIsFree(userId) {
    if (!await userModel.findOne({ "id": userId[0] })) return true
    else return false 
}

module.exports = UserController;

