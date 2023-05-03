import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";
import { OK } from "http-status";
import { Blog } from "../models/Blog.model";
import sendResponse from "../utils/sendResponse";

export const createBlog = catchAsync(async (req: Request, res: Response) => {
    const blog = await Blog.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            blog,
        }
    })
});

export const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.aggregate([
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $skip: skip,
        },
        {
            $limit: limit,
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: '$user',
        },
    ])
    sendResponse(res, {
        status: OK,
        message: 'Blogs fetched successfully',
        data: {
            blogs,
        }
    })
});
