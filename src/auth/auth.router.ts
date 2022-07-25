import Router from 'koa-router';

import AuthController from './auth.controller';
import localStrategy from '../utils/middleware/auth/localStrategy';
import jwtRefreshStrategy from '../utils/middleware/auth/jwtRefreshStrategy';

const authRouter = new Router();

authRouter.post('/auth/sign-in', localStrategy, AuthController.signIn);

authRouter.get('/auth/refresh', jwtRefreshStrategy, AuthController.refresh);

export default authRouter;
