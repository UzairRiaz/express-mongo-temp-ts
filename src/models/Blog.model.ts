import mongoose from "mongoose";
import { paginate } from "./plugins/pagination";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
}, { timestamps: true });

BlogSchema.plugin(paginate);

export const Blog = mongoose.model('blogs', BlogSchema);
