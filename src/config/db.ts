import mongoose from "mongoose";

import { MONGO_URI } from "./env";

export default async () => {
    try {
        const connection = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
