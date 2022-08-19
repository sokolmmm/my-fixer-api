import StacksService from './stack.service';
import stackValidator from './stack.validator';

import { IAppContext } from '../types/interface';

export default class StackController {
  static async stacksList(ctx: IAppContext) {
    const stacks = await StacksService.stacksList();

    ctx.body = stacks;
  }

  static async retrieveStackById(ctx: IAppContext) {
    const { stackId } = ctx.params;

    const stack = await StacksService.retrieveStackById(stackId);

    ctx.body = stack;
  }

  static async createStack(ctx: IAppContext) {
    const payload = ctx.request.body;

    stackValidator.validateCreateStackPayload(payload);

    const stack = await StacksService.createStack(payload);

    ctx.body = stack;
  }
}
