import Router from 'koa-router';

import ProfileController from './profile.controller';
import jwtStrategy from '../utils/middleware/auth/jwtStrategy';
import activationChecker from '../utils/middleware/activationChecker';

const profileRouter = new Router();

profileRouter.patch('/users/profile', jwtStrategy, activationChecker, ProfileController.patchProfileById);

export default profileRouter;
