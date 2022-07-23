import Router from 'koa-router';

import UserController from './user.controller';
import jwtStrategy from '../utils/middleware/auth/jwtStrategy';

const userRouter = new Router();

userRouter.post('/users', UserController.createUser);
userRouter.get('/users', jwtStrategy, UserController.usersList);

userRouter.get('/users/:userId', jwtStrategy, UserController.retrieveUserById);
userRouter.patch('/users/:userId', jwtStrategy, UserController.patchUserById);
userRouter.delete('/users/:userId', jwtStrategy, UserController.deleteUserById);

userRouter.put('/users/photo', jwtStrategy, UserController.updatePhoto);

export default userRouter;
