import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    permissions: [
        {
            type: String,
        }
    ],
}, { timestamps: true });

export const Role = mongoose.model('roles', RoleSchema);
