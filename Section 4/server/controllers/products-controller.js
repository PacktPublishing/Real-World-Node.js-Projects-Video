const express = require("express");
const asyncWrapper = require("../utilities/async-wrapper").AsyncWrapper;
const router = express.Router();
const Product = require("../models/product");

router.get("/", asyncWrapper(async (req, res) => {
    res.send(await Product.find({}));
}));

router.put("/:id", asyncWrapper(async (req, res) => {
    var updated = await Product.findOneAndUpdate({
        _id: req.params.id
    }, {
        available: req.body.available
    });
    res.status(200).send(updated);
}));

module.exports = router;