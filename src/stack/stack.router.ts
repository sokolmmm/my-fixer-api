import Router from 'koa-router';

import StackController from './stack.controller';
import jwtStrategy from '../utils/middleware/auth/jwtStrategy';
import activationChecker from '../utils/middleware/activationChecker';

const stackRouter = new Router();

stackRouter.get('/stacks', jwtStrategy, activationChecker, StackController.stacksList);
stackRouter.post('/stacks', jwtStrategy, activationChecker, StackController.createStack);

stackRouter.get('/stacks/:stackId', jwtStrategy, activationChecker, StackController.retrieveStackById);

export default stackRouter;
