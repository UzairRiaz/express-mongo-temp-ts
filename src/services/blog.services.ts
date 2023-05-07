import { Blog } from '../models/Blog.model';
import { Blog as BlogType } from '../types/model.interfaces';

const createBlog = async (blog: any) => {
    return Blog.create(blog);
}

const getAllBlogs = async ({ limit, skip, userId }: { limit: number, skip: number, userId: string | null }) => {
    return Blog.aggregate([
        {
            $match: {
                ...(userId && { userId }),
            },
        },
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
        {
            $project: {
                title: 1,
                content: 1,
                createdAt: { $dateToString: { format: '%Y-%m-%d %H:%M', date: '$createdAt' } },
                'user._id': 1,
                'user.name': 1,
                'user.email': 1,
            },
        },
    ])
}

const getBlog = async (id: string) => {
    const blog = await Blog.aggregate([
        {
            $match: {
                _id: id,
            },
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
        {
            $project: {
                title: 1,
                content: 1,
                createdAt: { $dateToString: { format: '%Y-%m-%d %H:%M', date: '$createdAt' } },
                'user._id': 1,
                'user.name': 1,
                'user.email': 1,
            },
        },
    ]) as BlogType[];
    return blog[0];
}

const editBlog = async (id: string, blog: any) => {
    return Blog.findOneAndUpdate({ _id: id }, blog, { new: true });
}

const deleteBlog = async (id: string) => {
    return Blog.findOneAndDelete({ _id: id });
}

export default {
    createBlog,
    getAllBlogs,
    getBlog,
    editBlog,
    deleteBlog,
}