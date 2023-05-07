import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { OK, NOT_FOUND, UNAUTHORIZED } from "http-status";
import { Blog } from "../models/Blog.model";
import sendResponse from "../utils/sendResponse";
import { User, Blog as BlogType } from "../types/model.interfaces";
import { ApiError } from "../utils/catchAsync";
import blogService from "../services/blog.services";

export const createBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.user as User;
    const blog = await blogService.createBlog({ ...req.body, userId: user.id }) as BlogType;
    sendResponse(res, {
        status: OK,
        message: 'Blog created successfully',
        data: {
            blog,
        }
    })
    return next();
});

export const getAllBlogs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const blogs = blogService.getAllBlogs({ limit, skip, userId: req.query.userId as string });
    sendResponse(res, {
        status: OK,
        message: 'Blogs fetched successfully',
        data: {
            blogs,
        }
    })
    return next();
});

export const getBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const blog = await blogService.getBlog(req.params.id) as BlogType;
    if (!blog) {
        throw new ApiError({ message: 'Blog not found', status: NOT_FOUND });
    }
    sendResponse(res, {
        status: OK,
        message: 'Blog fetched successfully',
        data: {
            blog,
        }
    })
    return next();
});

export const editBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const blog = await Blog.findOne({ _id: req.params.id }) as BlogType;
    if (!blog) {
        throw new ApiError({ message: 'Blog not found', status: NOT_FOUND });
    }
    const user = req.user as User;
    if (blog.userId !== user.id) {
        throw new ApiError({ message: 'You are not authorized to edit this blog', status: UNAUTHORIZED });
    }
    await blogService.editBlog(req.params.id, req.body);
    sendResponse(res, {
        status: OK,
        message: 'Blog updated successfully',
    })
    return next();
});

export const deleteBlog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const blog = await Blog.findOne({ _id: req.params.id }) as BlogType;
    if (!blog) {
        throw new ApiError({ message: 'Blog not found', status: NOT_FOUND });
    }
    const user = req.user as User;
    if (blog.userId !== user.id) {
        throw new ApiError({ message: 'You are not authorized to delete this blog', status: UNAUTHORIZED });
    }
    await blogService.deleteBlog(req.params.id);
    sendResponse(res, {
        status: OK,
        message: 'Blog deleted successfully',
    })
    return next();
});