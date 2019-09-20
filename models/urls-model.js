const mongoose = require("mongoose");
const schema = mongoose.Schema;

const urlModel = new schema({
    url: {trim: true, type: String, require: true, index: true},
    userid: {trim: true, type: String, require: true},
    hits: {type: Number},
    shortUrl: {type: String, require: true}
})

urlModel.pre('save', function (next) {
    if (!this.shortUrl) this.shortUrl = "http://localhost:8080/urls/" +  ((Math.random() * 3).toFixed(5)).toString().substr(2);
    if (!this.hits) this.hits = 0;
    next();
})

module.exports = mongoose.model("urlModel", urlModel);