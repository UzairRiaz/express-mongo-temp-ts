import express, { Request, Response } from 'express';
import router from './routes';
import passport from 'passport';
import jwtStrategy from './config/passport';

require('./config/db').default();

const app = express();

// JWT authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy(passport));

app.use(express.json());

app.use('/v1', router);

const port: number = Number(process.env.PORT) || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

