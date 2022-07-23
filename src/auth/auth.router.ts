import Router from 'koa-router';

import AuthController from './auth.controller';
import localStrategy from '../utils/middleware/auth/localStrategy';
import jwtStrategy from '../utils/middleware/auth/jwtStrategy';
import jwtRefreshStrategy from '../utils/middleware/auth/jwtRefreshStrategy';

const authRouter = new Router();

authRouter.post('/auth/login', localStrategy, AuthController.login);
authRouter.delete('/auth/logout', jwtStrategy, AuthController.logout);

authRouter.get('/auth/refresh', jwtRefreshStrategy, AuthController.refresh);

export default authRouter;
