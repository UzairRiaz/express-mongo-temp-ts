import { Comment } from "../models/Comment.model";

const createComment = async (comment: any) => {
    return Comment.create(comment);
}

const getAllComments = async (blogId: string, { limit, skip }: { limit: number, skip: number }) => {
    return Comment.aggregate([
        {
            $match: {
                blogId,
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
                content: 1,
                createdAt: { $dateToString: { format: '%Y-%m-%d %H:%M', date: '$createdAt' } },
                'user._id': 1,
                'user.name': 1,
                'user.email': 1,
            },
        },
    ])
}

const editComment = async (id: string, comment: any) => {
    return Comment.findByIdAndUpdate(id, comment, { new: true });
}

const deleteComment = async (id: string) => {
    return Comment.findByIdAndDelete(id);
}

export default {
    createComment,
    getAllComments,
    editComment,
    deleteComment,
}
