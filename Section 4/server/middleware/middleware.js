const CommonMiddleware = require("./common");

module.exports = function MiddlewareManager(app, clientRoot) {
    CommonMiddleware(app, clientRoot);
}