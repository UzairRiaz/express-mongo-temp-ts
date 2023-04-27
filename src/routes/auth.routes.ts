import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { logInValidation, signUpValidation } from '../validations/auth.validations';
import { login, signup } from '../controllers/auth.controller';

const router: Router = Router();

router
    .post('/login', validate(logInValidation), login)
    .post('/register', validate(signUpValidation), signup)
    .get('/me')
    .get('/logout');

export default router;
