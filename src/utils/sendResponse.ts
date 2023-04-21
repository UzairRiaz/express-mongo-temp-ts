import { Response } from "express";

type ResponseData = {
    status: number;
    message: string;
    data?: any;
};

export default (res: Response, data: ResponseData) => {
    const { status, message, data: responseData } = data;
    return res.status(status).json({
        message,
        data: responseData,
    });
}
