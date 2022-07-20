import Router from 'koa-router';

import UserController from './user.controller';

const userRouter = new Router();

userRouter.get('/users', UserController.usersList);
userRouter.post('/users', UserController.createUser);

userRouter.get('/users/:userId', UserController.retrieveUserById);
userRouter.patch('/users/:userId', UserController.patchUserById);
userRouter.delete('/users/:userId', UserController.deleteUserById);

userRouter.put('/users/:userId/photo', UserController.updatePhoto);

export default userRouter;
