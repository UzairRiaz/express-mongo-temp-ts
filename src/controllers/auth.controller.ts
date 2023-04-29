import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { loginUserWithEmailAndPassword } from '../services/auth.service';
import { generateJWT } from '../helpers/jwt.helpers'

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await loginUserWithEmailAndPassword(email, password);
    const token = await generateJWT(user.id);
    sendResponse(res, { status: 200, message: "Login Successful", data: { user, token } });
    return next();
});

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // const user = await authService.signupWithEmailAndPassword(email, password);
    // const token = await tokenService.generateAuthTokens(user);
    sendResponse(res, { status: 200, message: "Signup Successful", data: { email, password } });
    return next();
});
