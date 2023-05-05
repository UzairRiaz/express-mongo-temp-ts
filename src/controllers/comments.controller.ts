import catchAsync, { ApiError } from "../utils/catchAsync";
import { OK, NOT_FOUND, UNAUTHORIZED } from "http-status";
import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import commentService from "../services/comment.services";
import { User } from "../types/model.interfaces";

export const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    const comment = await commentService.createComment({ ...req.body, userId: user.id });
    sendResponse(res, {
        status: OK,
        message: 'Comment created successfully',
        data: {
            comment,
        }
    })
    return next();
});

export const getAllComments = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.blogId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const comments = await commentService.getAllComments(blogId, { limit, skip });
    sendResponse(res, {
        status: OK,
        message: 'Comments fetched successfully',
        data: {
            comments,
            page,
        }
    })
    return next();
});

export const editComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const comment = await commentService.editComment(req.params.id, req.body);
    if (!comment) {
        throw new ApiError({ message: 'Comment not found', status: NOT_FOUND });
    }
    if (comment.userId !== (req.user as User).id) {
        throw new ApiError({ message: 'You are not authorized to edit this comment', status: UNAUTHORIZED });
    }
    sendResponse(res, {
        status: OK,
        message: 'Comment updated successfully',
        data: {
            comment,
        }
    })
    return next();
});

export const deleteComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const comment = await commentService.deleteComment(req.params.id);
    if (!comment) {
        throw new ApiError({ message: 'Comment not found', status: NOT_FOUND });
    }
    if (comment.userId !== (req.user as User).id) {
        throw new ApiError({ message: 'You are not authorized to delete this comment', status: UNAUTHORIZED });
    }
    sendResponse(res, {
        status: OK,
        message: 'Comment deleted successfully',
        data: {
            comment,
        }
    })
    return next();
});

