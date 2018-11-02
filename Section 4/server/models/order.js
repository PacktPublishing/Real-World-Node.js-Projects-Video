const mongoose = require("mongoose");

const Order = mongoose.model("Order", {
    products: {
        type: Array,
        required: true
    },
    customer: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            street: {
                type: String,
                required: true
            },
            number: {
                type: String,
                required: true
            }
        }
    }
}, "Orders");

module.exports = Order;