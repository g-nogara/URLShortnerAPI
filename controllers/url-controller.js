mongoose = require("mongoose");
require("../models/urls-model");
const urlModel = mongoose.model("urlModel");

class UrlController {

    async getUrl (req, res) {
        const result = await urlModel.findOne({"shortUrl": "http://localhost:8080/urls/" + req.params.id})
        res.status(301).redirect(result.url);
        result.hits += 1;
        await result.save();
    }

    async delete (req, res) {
        await urlModel.findOneAndDelete({"shortUrl": "http://localhost:8080/urls/" + req.params.id})
        res.status(204).send();
    }

};

module.exports = UrlController;