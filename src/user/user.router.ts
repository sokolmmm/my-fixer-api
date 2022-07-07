import Router from 'koa-router';
import UserController from './user.controller';

const userRouter = new Router();

userRouter.get('/users', UserController.usersList);

export default userRouter;
