import mongoose from "mongoose";
import { paginate } from "./plugins/pagination";

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        length: 255,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs',
    }
}, { timestamps: true });

CommentSchema.plugin(paginate);

export const Comment = mongoose.model('comments', CommentSchema);
