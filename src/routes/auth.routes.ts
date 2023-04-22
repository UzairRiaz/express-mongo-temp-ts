import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { logInValidation } from '../validations/auth.validations';

const router: Router = Router();

router
    .post('/login',
        validate(logInValidation),
    )
    .post('/register')
    .get('/me')
    .get('/logout');

export default router;
