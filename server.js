"use strict"

const app = require("./bin/express.js");
const http = require("http").Server(app);
const port = process.env.PORT || 8080

http.listen(port, function() {
    console.log(`Listening on port ${port}`);
})