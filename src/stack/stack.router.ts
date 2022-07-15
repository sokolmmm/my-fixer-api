import Router from 'koa-router';
import StackController from './stack.controller';

const stackRouter = new Router();

stackRouter.get('/stacks', StackController.stacksList);

export default stackRouter;
