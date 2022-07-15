import Router from 'koa-router';
import ProfileController from './profile.controller';

const profileRouter = new Router();

profileRouter.post('/profile/:userId', ProfileController.createProfile);
profileRouter.get('/profile/:userId', ProfileController.retrieveProfileById);
profileRouter.patch('/profile/:userId', ProfileController.patchProfileById);

export default profileRouter;
