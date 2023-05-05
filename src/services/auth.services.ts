import { comparePassword, hashPassword } from "../helpers/auth.helpers";
import { UNAUTHORIZED } from "http-status";

import { User } from "../models/User.model";
import { ApiError } from "../utils/catchAsync";

export const loginUserWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError({ message: "Incorrect email or password", status: UNAUTHORIZED });
    }
    const passwordMatched = await comparePassword(password, user.password)
    if (!passwordMatched) {
        throw new ApiError({ message: "Incorrect email or password", status: UNAUTHORIZED });
    }
    return user;
};

export const signupWithEmailAndPassword = async ({ email, password, name }: { email: string, password: string, name: string }) => {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new ApiError({ message: "You already have an account please login.", status: UNAUTHORIZED });
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ email, password: hashedPassword, name });
    return user;
}