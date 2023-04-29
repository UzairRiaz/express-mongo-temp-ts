import { comparePassword } from "../helpers/auth.helpers";

import { User } from "../models/User.model";

export const loginUserWithEmailAndPassword = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Incorrect email or password");
    }
    const passwordMatched = await comparePassword(password, user.password)
    if (!passwordMatched) {
        throw new Error("Incorrect email or password");
    }
    return user;
};