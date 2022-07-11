import Router from 'koa-router';
import UserController from './user.controller';

const userRouter = new Router();

userRouter.get('/users', UserController.usersList);
userRouter.post('/users', UserController.createUser);
userRouter.get('/user:userId', UserController.retrieveUserById);
userRouter.patch('/user:userId', UserController.patchUserById);
userRouter.delete('/user:userId', UserController.deleteUserById);

export default userRouter;
