import Joi, { Schema } from "joi";
import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";
import { BAD_REQUEST } from 'http-status';
const { pick } = require('../utils/pick');

const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema: Schema = pick(schema, ['params', 'query', 'body', 'headers', 'files']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);

    if (error) {
        const errorMessage = error.details.map((details: any) => details.message).join(', ');
        sendResponse(res, {
            status: BAD_REQUEST,
            message: errorMessage,
        });
        return next(error);
    } else {
        Object.assign(req, value);
        return next();
    }
};

module.exports = validate;
