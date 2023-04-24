import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { logInValidation } from '../validations/auth.validations';
import { login } from '../controllers/auth.controller';

const router: Router = Router();

router
    .post('/login',
        validate(logInValidation),
        login
    )
    .post('/register')
    .get('/me')
    .get('/logout');

export default router;
