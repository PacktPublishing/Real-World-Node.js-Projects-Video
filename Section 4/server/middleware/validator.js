const Joi = require("joi");
const ValidationError = require("../errors/validation-error");

"use strict";

// Schemas
const { UserSchema, UserSignInSchema } = require("../models/user");
const { ToDoSchema, ToDoStateChangedSchema } = require("../models/todo");

let validators = {
    'User': {
        scopes: {
            default: UserSchema,
            signIn: UserSignInSchema
        }
    },
    'ToDo': {
        scopes: {
            default: ToDoSchema,
            stateChanged: ToDoStateChangedSchema
        }
    }
}

function scopeExists(validator, scope) {
    return Object.keys(validator.scopes).find(key => key == scope) != undefined;
}

function getSchema(model, scope) {
    let validator = validators[model];
    if(!validator) {
        throw new Error("Validator does not exist");
    }
    // First check if the given validator has multiple scopes
    if(validator.scopes) {
        // If there is a defined scope 
        if(scope) {
            if(!scopeExists)  {
                throw new Error(`Scope ${scope} does not exist in ${model} validator`);
            }
            else {
                return validator.scopes[scope];
            }
        }
        else {
            return validator.scopes.default;
        }
    }
    else {
        return validator;
    }
}

function validate(model, object, scope) {
    return Joi.validate(object, getSchema(model, scope), {
        allowUnknown: true
    });
}

module.exports = function ValidatorMiddleware(model, scope) {
    return (req, res, next) => {
        const validationResult = validate(model, req.body, scope);
        if(validationResult.error) {
            throw new ValidationError(validationResult.error.message);
        }
        else {
            next();
        }
    }
}
