require("../models/users-model");
require("../models/urls-model");
const mongoose = require("mongoose");
const urlModel = mongoose.model("urlModel");

class StatsController {

    async getAll (req, res) {
        const list = await urlModel.find();
        let hits = 0;
        let urlCount = 0;
        list.forEach(url => {
            hits += url.hits
            urlCount++;
        })
        const listaSorted = list.sort((x,y) => y.hits > x.hits);
        const top10 = listaSorted.slice(0,10);
        const result = {
            "hits": hits,
            "urlCount": urlCount,
            "topUrls": top10,
        };
        res.status(200).send(result);
    }

    async getByUrlId (req, res) {
        //Get the url identifier in the request, and make it into a Regular Expression to match with what we want in the DB
        const identifier = req.params.id;
        const regEx = new RegExp(identifier);
        const result = await urlModel.find({"shortUrl": regEx});

        if (result === []) res.status(404).send("URL not found")
        else res.status(302).send(result);

    }
}

module.exports = StatsController;
