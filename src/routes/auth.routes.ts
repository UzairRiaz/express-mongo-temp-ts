import { Router } from 'express';

const router: Router = Router();

router
    .post('/login')
    .post('/register')
    .get('/me')
    .get('/logout');

export default router;
