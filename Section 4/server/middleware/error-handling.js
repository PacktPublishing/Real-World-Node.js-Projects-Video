const chalk = require("chalk");


function errorLogger(err, req, res, next) {
    if(err.message) {
        console.log(chalk.red(err.message));
    }
    if(err.stack) {
        console.log(chalk.red(err.stack));
    }
    next(err);
}

function genericErrorHandler(err, req, res, next) {
    res.sendStatus(500);
    next();
}

module.exports = function ErrorHandlingMiddleware(app) {
    app.use([errorLogger, genericErrorHandler]);
}