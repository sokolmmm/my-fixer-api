import { Context } from 'koa';
import UserService from './user.service';
import userValidator from './user.validator';

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

  static async createUser(ctx: Context) {
    const {
      firstName, lastName, userName, email,
    } = ctx.request.body;

    userValidator.validateCreateUserPayload({
      firstName,
      lastName,
      userName,
      email,
    });

    const user = await UserService.createUser({
      firstName,
      lastName,
      userName,
      email,
    });
    console.log(user);
    ctx.body = user;
  }
}
