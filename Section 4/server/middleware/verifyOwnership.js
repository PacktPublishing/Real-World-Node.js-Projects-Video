const models = require("../models/index");
const User = models.User;
const ValidationError = require("../errors/errors").ValidationError;
const AccessDeniedError = require("../errors/errors").AccessDeniedError;
const stringToProp = require("../utilities/string-to-prop");

/**
 * Verifies that the current user owns the given resource. Must be called after protected-route
 * @param {string} model The model name (e.g ToDo)
 */
function VerifyOwnershipMiddleware(model, idPath) {
    return (req, res, next) => {
        try {
            const user = req.user;
            if (!user) {
                return res.sendStatus(503);
            }
            models[model].findOne({
                where: {
                    id: idPath ? stringToProp(req, idPath) : req.params.id
                },
                include: [{model: User, as: "user", attributes: {exclude: "password"}}]
            }).then(item => {
                if (!item) {
                    throw new ValidationError(`${model} does not exist`);
                }
                if (item.user.id == user.id) {
                    req[model.toLowerCase()] = item;
                    next();
                } else {
                    throw new AccessDeniedError();
                }
            }).catch(err => next(err));
        } catch (err) {
            next(err);
        }
    }
}

module.exports = VerifyOwnershipMiddleware;