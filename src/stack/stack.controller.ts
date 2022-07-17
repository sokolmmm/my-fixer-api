import { Context } from 'koa';

import StacksService from './stack.service';
import stackValidator from './stack.validator';

export default class StackController {
  static async stacksList(ctx: Context) {
    const stacks = await StacksService.stacksList();

    ctx.body = stacks;
  }

  static async retrieveStackById(ctx: Context) {
    const { stackId } = ctx.params;

    const stack = await StacksService.retrieveStackById(stackId);

    ctx.body = stack;
  }

  static async createStack(ctx: Context) {
    const payload = ctx.request.body;

    stackValidator.validateCreateStackPayload(payload);

    const stack = await StacksService.createStack(payload);

    ctx.body = stack;
  }
}
