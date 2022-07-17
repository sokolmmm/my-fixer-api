import Router from 'koa-router';

import StackController from './stack.controller';

const stackRouter = new Router();

stackRouter.get('/stacks', StackController.stacksList);
stackRouter.post('/stacks', StackController.createStack);

stackRouter.get('/stacks/:stackId', StackController.retrieveStackById);

export default stackRouter;
