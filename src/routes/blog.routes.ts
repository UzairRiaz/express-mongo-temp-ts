import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware';
import auth from '../middlewares/auth.middleware';
import { createBlogValidation, editBlogValidation, deleteBlogValidation } from '../validations/blog.validations';
import { createBlog, getAllBlogs, getBlog, editBlog, deleteBlog } from '../controllers/blog.controller';

const router: Router = Router();

router
    .get('/', getAllBlogs)
    .post('/', auth('createBlog'), validate(createBlogValidation), createBlog)
    .get('/:id', getBlog)
    .put('/:id', auth('editBlog'), validate(editBlogValidation), editBlog)
    .delete('/:id', auth('deleteBlog'), validate(deleteBlogValidation), deleteBlog);

export default router;
