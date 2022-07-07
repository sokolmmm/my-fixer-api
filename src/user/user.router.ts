import Router from 'koa-router';
import UserController from './user.controller';

const userRouter = new Router();

userRouter.get('/users', UserController.usersList);
userRouter.post('/users', UserController.createUser);
userRouter.get('/user:userId', UserController.retrieveUserById);

export default userRouter;
