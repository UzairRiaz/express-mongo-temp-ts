import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";
import { BAD_REQUEST } from 'http-status';
import { pick } from '../utils/pick';

const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema: any = pick(schema, ['params', 'query', 'body', 'headers', 'files']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);
    console.log({ value, error })
    if (error) {
        const errorMessage = error.details.map((details: any) => details.message).join(', ');
        sendResponse(res, {
            status: BAD_REQUEST,
            message: errorMessage,
        });
        return next(error);
    } else {
        Object.assign(req, {});
        return next();
    }
};

export { validate };
