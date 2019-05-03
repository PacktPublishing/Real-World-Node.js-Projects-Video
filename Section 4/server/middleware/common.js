const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

module.exports = function CommonMiddleware(app, clientRoot) {
    app.use(express.static(`${clientRoot}`));
    app.use(bodyParser.json());
    app.use(morgan("common"));
    app.use(cors());
    app.use(helmet());
}