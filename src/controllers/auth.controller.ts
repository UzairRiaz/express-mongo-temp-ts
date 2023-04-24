import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // const user = await authService.loginUserWithEmailAndPassword(email, password);
    // const token = await tokenService.generateAuthTokens(user);
    sendResponse(res, { status: 200, message: "Login Successful", data: { email, password } })
});
