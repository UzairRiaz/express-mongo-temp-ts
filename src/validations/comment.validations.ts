import Joi from "joi";
import { getAllBlogs } from "../controllers/blog.controller";

export const createCommentValidation = {
    body: Joi.object().keys({
        blogId: Joi.string().required(),
        comment: Joi.string().required(),
    }),
};

export const editCommentValidation = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        comment: Joi.string().required(),
    }),
};

export const deleteCommentValidation = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export const getAllBlogCommentsValidation = {
    params: Joi.object().keys({
        blogId: Joi.string().required(),
    }),
};
