import Router from 'koa-router';

import UserController from './user.controller';
import jwtStrategy from '../utils/middleware/auth/jwtStrategy';
import jwtActivation from '../utils/middleware/auth/jwtActivation';

const userRouter = new Router();

userRouter.post('/users', UserController.createUser);
userRouter.get('/users', jwtStrategy, UserController.usersList);
userRouter.patch('/users', jwtStrategy, UserController.patchUserById);

userRouter.get('/users/:userId', jwtStrategy, UserController.retrieveUserById);
userRouter.delete('/users/:userId', jwtStrategy, UserController.deleteUserById);

userRouter.put('/users/photo', jwtStrategy, UserController.updatePhoto);

userRouter.get('/users/confirm-email/:activationLink', jwtActivation, UserController.confirmEmail);

userRouter.post('/users/reset-password', UserController.resetPassword);
userRouter.post('/users/reset-password/:resetLink', UserController.resetPassword);

export default userRouter;
