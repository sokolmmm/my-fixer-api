import Router from 'koa-router';

import UserController from './user.controller';
import jwtStrategy from '../utils/middleware/auth/jwtStrategy';
import jwtActivation from '../utils/middleware/auth/jwtActivation';
import codeVerify from '../utils/middleware/codeVerify';
import activationChecker from '../utils/middleware/activationChecker';

const userRouter = new Router();

userRouter.post('/users', UserController.createUser);
userRouter.get('/users', jwtStrategy, activationChecker, UserController.usersList);
userRouter.patch('/users', jwtStrategy, activationChecker, UserController.patchUserById);

userRouter.get('/users/:userId', jwtStrategy, activationChecker, UserController.retrieveUserById);
userRouter.delete('/users/:userId', jwtStrategy, activationChecker, UserController.deleteUserById);

userRouter.put('/users/photo', jwtStrategy, activationChecker, UserController.updatePhoto);

userRouter.get('/users/confirm-email/:activationLink', jwtActivation, UserController.confirmEmail);

userRouter.post('/users/password/reset', UserController.sendResetPasswordMail);
userRouter.put('/users/password/reset', codeVerify, activationChecker, UserController.resetPassword);

export default userRouter;
