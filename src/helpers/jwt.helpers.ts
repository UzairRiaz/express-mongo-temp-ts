import jwt from 'jsonwebtoken';
import {
    JWT_SECRET, JWT_EXPIRES_IN
} from '../config/env';

export const generateJWT = (userId: string) => {
    const token = jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
    return token;
}
