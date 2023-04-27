import mongoose from "mongoose";

const User = mongoose.model("User");

const loginUserWithEmailAndPassword = async (email: string, password: string) => {
    const user = User.findOne({ email });
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new Error("Incorrect email or password");
    }
    return user;
};