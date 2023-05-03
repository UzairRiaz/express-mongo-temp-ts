import Joi from "joi";

export const createBlogValidation = {
    body: {
        title: Joi.string().required(),
        content: Joi.string().required(),
    },
}

export const deleteBlogValidation = {
    params: {
        id: Joi.string().required(),
    },
}

export const editBlogValidation = {
    params: {
        id: Joi.string().required(),
    },
    body: {
        title: Joi.string().required(),
        content: Joi.string().required(),
    },
}
