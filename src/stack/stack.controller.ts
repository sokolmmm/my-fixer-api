import { Context } from 'koa';
import StacksService from './stack.service';

export default class StackController {
  static async stacksList(ctx: Context) {
    const stack = await StacksService.stacksList();

    ctx.body = stack;
  }
}
