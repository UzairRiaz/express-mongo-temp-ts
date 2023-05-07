import { Types } from "mongoose";

interface User {
    id: string | Types.ObjectId;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    role: string;
}

interface Blog {
    id: string | Types.ObjectId;
    title: string;
    content: string;
    userId: string | Types.ObjectId;
    createdAt: Date;
}

interface Comment {
    id: string | Types.ObjectId;
    text: string;
    blogId: string | Types.ObjectId;
    userId: string | Types.ObjectId;
}

export {
    User,
    Blog,
    Comment,
}
