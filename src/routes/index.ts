import express, { Router } from 'express';

const router = express.Router();

type RouteConfig = {
    path: string;
    router: Router;
};

const routes: Array<RouteConfig> = [
    {
        path: '/',
        router: require('./auth.routes').default,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;
