import { Request, Response, NextFunction } from "express";
import {
    OK, UNAUTHORIZED
} from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { loginUserWithEmailAndPassword, signupWithEmailAndPassword } from '../services/auth.service';
import { generateJWT } from '../helpers/jwt.helpers'

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await loginUserWithEmailAndPassword({ email, password });
    if (!user) {
        sendResponse(res, { status: UNAUTHORIZED, message: "Incorrect email or password" });
        return next();
    }
    const token = generateJWT(user.id);
    sendResponse(res, { status: OK, message: "Login Successful", data: { user, token } });
    return next();
});

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;
    const user = await signupWithEmailAndPassword({ email, password, name });
    if (!user) {
        sendResponse(res, { status: UNAUTHORIZED, message: "You already have an account please login." });
        return next();
    }
    const token = generateJWT(user.id);
    sendResponse(res, { status: OK, message: "Signup Successful", data: { user, token } });
    return next();
});

export const getProfile = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const { user } = req;
    sendResponse(res, { status: OK, message: "User Profile", data: { user } });
    return next();
});

