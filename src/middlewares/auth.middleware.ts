import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import httpStatus from 'http-status';
import { ApiError } from '../utils/catchAsync';
import { User } from '../types/model.interfaces';
import { RequestWithUser } from '../types/express.interfaces';

import { Role } from '../models/Role.model';

const verifyCallback = (req: any, resolve: any, reject: any, requiredRights: string[]) => async (err: ApiError, user: User, info: any) => {
    if (err || info || !user) {
        return reject(new ApiError({ message: 'Please authenticate', status: httpStatus.UNAUTHORIZED }));
    }
    req.user = user;
    if (requiredRights.length) {
        const role: any = await Role.findOne({ name: user.role });
        const permissions = role.permissions ? role.permissions : [];
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
                .catch((err) => {
                    next(err)
                });
        };

export default auth;
