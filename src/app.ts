import express, { Request, Response } from 'express';
import router from './routes';
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/v1', router);

const port: number = Number(process.env.PORT) || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

