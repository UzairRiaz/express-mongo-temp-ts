import express from "express";
import { createComment, deleteComment, editComment, getAllComments } from "../controllers/comments.controller";
import auth from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createCommentValidation, getAllBlogCommentsValidation, editCommentValidation, deleteCommentValidation } from "../validations/comment.validations";
const router = express.Router();

router
    .post('/', auth('createComment'), validate(createCommentValidation), createComment)
    .get('/:blogId', auth(), validate(getAllBlogCommentsValidation), getAllComments)
    .put('/:id', auth(), validate(editCommentValidation), editComment)
    .delete('/:id', auth(), validate(deleteCommentValidation), deleteComment)

export default router;
