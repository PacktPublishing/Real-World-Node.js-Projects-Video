const express = require("express");
const path = require("path");
const middleware = require("./middleware/middleware");
const errorHandlingMiddleware = require("./middleware/error-handling");

const OrdersController = require("./controllers/orders-controller");
const ProductsController = require("./controllers/products-controller");

const PORT = process.env.PORT || 9000;


require("./models/index")().then(mongoose => {
    const app = express();
    const clientRoot = path.join(__dirname, "..", "/client/dist/packt-app-service");

    middleware(app, clientRoot);

    // Controllers
    app.use("/api/orders", OrdersController);
    app.use("/api/products", ProductsController);

    errorHandlingMiddleware(app);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
