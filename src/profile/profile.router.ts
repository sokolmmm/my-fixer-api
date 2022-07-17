import Router from 'koa-router';

import ProfileController from './profile.controller';

const profileRouter = new Router();

profileRouter.get('/users/:userId/profiles', ProfileController.retrieveProfileById);
profileRouter.patch('/users/:userId/profiles', ProfileController.patchProfileById);

export default profileRouter;
