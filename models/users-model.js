const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userModel = new schema({
    name: {trim: true, type: String, index: true, required: true},
    id: {trim: true, type: String, required: true}
})

module.exports = mongoose.model("userModel", userModel);