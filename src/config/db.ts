import mongoose from "mongoose";

export default async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI || "");
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}