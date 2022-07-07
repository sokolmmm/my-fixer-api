import { Context } from 'koa';
import UserService from './user.service';

export default class UserController {
  static async usersList(ctx: Context) {
    const users = await UserService.usersList();

    ctx.body = users;
  }

  static async retrieveUserById(ctx: Context) {
    const { userId } = ctx.params;

    const user = await UserService.userById(userId);

    ctx.body = user;
  }
}
