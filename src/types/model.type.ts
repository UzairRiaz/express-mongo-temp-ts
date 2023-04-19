import { Types } from "mongoose";

type User = {
    id: string | Types.ObjectId;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

type Post = {
    id: string | Types.ObjectId;
    text: string;
};

type Comment = {
    id: string | Types.ObjectId;
    text: string;
    postId: string | Types.ObjectId;
};

export {
    User,
    Post,
    Comment,
};
