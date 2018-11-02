const express = require("express");
const asyncWrapper = require("../utilities/async-wrapper").AsyncWrapper;
const router = express.Router();
const Order = require("../models/order");
const ObjectId = require("mongoose");

router.get("/:email", asyncWrapper(async (req, res) => {
    let orders = await Order.find({
        "customer.email": req.params.email
    });
    res.send(orders);
}));

router.post("/", asyncWrapper(async (req, res) => {
    let order = new Order(req.body);
    await order.save();
    res.sendStatus(200);
}));

router.delete("/:id", asyncWrapper(async (req, res) => {
    let deleted = await Order.findOneAndDelete({_id: req.params.id});
    res.status(200).send(deleted);
}));

module.exports = router;