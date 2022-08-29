import Router from 'koa-router';

import AuthController from './auth.controller';
import localStrategy from '../utils/middleware/auth/localStrategy';
import jwtRefreshStrategy from '../utils/middleware/auth/jwtRefreshStrategy';
import activationChecker from '../utils/middleware/activationChecker';

const authRouter = new Router();

authRouter.post('/auth/sign-in', localStrategy, activationChecker, AuthController.signIn);

authRouter.get('/auth/refresh', jwtRefreshStrategy, AuthController.refresh);

export default authRouter;
