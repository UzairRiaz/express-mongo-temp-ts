import { Secret } from "jsonwebtoken";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const JWT_SECRET = process.env.JWT_SECRET as Secret;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;
export const MONGO_URI = process.env.MONGO_URI as string;
export const PORT = process.env.PORT as string;
export const NODE_ENV = process.env.NODE_ENV as string;
