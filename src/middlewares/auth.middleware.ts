import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import httpStatus from 'http-status';
import { ApiError } from '../utils/catchAsync';
import { User } from '../types/model.interfaces';
import { RequestWithUser } from '../types/express.interfaces';

const Roles = mongoose.model('roles');

const verifyCallback = (req: RequestWithUser, resolve: any, reject: any, requiredRights: string[]) => async (err: ApiError, user: User, info: any) => {
    if (err || info || !user) {
        return reject(new ApiError({ message: 'Please authenticate', status: httpStatus.UNAUTHORIZED }));
    }
    req.user = user;
    if (requiredRights.length) {
        const { permissions } = await Roles.findOne({ name: user.role });
        const hasRequiredRights = requiredRights.every((requiredRight) => permissions.includes(requiredRight));

        if (!hasRequiredRights) {
            return reject(new ApiError({ message: 'Forbidden', status: httpStatus.FORBIDDEN }));
        }
    }

    resolve();
};

const auth =
    (...requiredRights: string[]) =>
        async (req: Request, res: Response, next: NextFunction) => {
            return new Promise((resolve, reject) => {
                passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
            })
                .then(() => {
                    next();
                })
                .catch((err) => next(err));
        };

module.exports = auth;
