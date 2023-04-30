import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware';
import auth from '../middlewares/auth.middleware';
import { logInValidation, signUpValidation } from '../validations/auth.validations';
import { login, signup, getProfile } from '../controllers/auth.controller';

const router: Router = Router();

router
    .post('/register', validate(signUpValidation), signup)
    .post('/login', validate(logInValidation), login)
    .get('/me', auth(), getProfile)
    .get('/logout');

export default router;
