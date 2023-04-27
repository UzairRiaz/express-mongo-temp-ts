import { Types } from "mongoose";

interface User {
    id: string | Types.ObjectId;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Post {
    id: string | Types.ObjectId;
    text: string;
}

interface Comment {
    id: string | Types.ObjectId;
    text: string;
    postId: string | Types.ObjectId;
}

export {
    User,
    Post,
    Comment,
}
