import { Request, Response, NextFunction } from 'express';
import sendResponse from './sendResponse';

export class ApiError extends Error {
    status: number;
    constructor({ message, status }: { message: string, status: number }) {
        super(message);
        this.status = status;
    }
}

const catchAsync = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(
        (err: ApiError) => {
            sendResponse(res, { status: err.status, message: err.message });
            next();
        }
    );
};

export default catchAsync;
