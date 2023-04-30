import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'user'
        }
    },
    { timestamps: true }
);

export const User = mongoose.model('users', UserSchema);
