import Router from 'koa-router';

import UserController from './user.controller';
import localStrategy from '../utils/middleware/auth/localStrategy';
import jwtStrategy from '../utils/middleware/auth/jwtStrategy';

const userRouter = new Router();

userRouter.get('/users', jwtStrategy, UserController.usersList);
userRouter.post('/users', UserController.createUser);

userRouter.get('/users/:userId', UserController.retrieveUserById);
userRouter.patch('/users/:userId', UserController.patchUserById);
userRouter.delete('/users/:userId', UserController.deleteUserById);

userRouter.put('/users/:userId/photo', UserController.updatePhoto);

userRouter.post('/users/sign-in', localStrategy, UserController.signIn);

export default userRouter;
