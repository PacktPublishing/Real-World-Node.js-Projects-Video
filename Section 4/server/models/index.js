const mongoose = require("mongoose");
const Product = require("./product");
const Order = require("./order");

module.exports = function() {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost:27017/Shopping", {useNewUrlParser: true});

    return new Promise((resolve, reject) => {
        mongoose.connection.on("error", err => {
            reject(err);
        });

        mongoose.connection.once("open", () => {
            resolve(mongoose);
        });
    });
}