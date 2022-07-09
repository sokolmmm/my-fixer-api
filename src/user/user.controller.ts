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
      firstName,
      lastName,
      userName,
      email,
      country,
      phoneNumber,
      title,
      company,
    } = ctx.request.body;

    const payload = {
      firstName,
      lastName,
      userName,
      email,
      country,
      phoneNumber,
      title,
      company,
    };

    userValidator.validateCreateUserPayload(payload);

    const user = await UserService.createUser(payload);
    console.log(user);
    ctx.body = user;
  }

  static async patchUserById(ctx: Context) {
    const { userId } = ctx.params;
    const {
      firstName,
      lastName,
      userName,
      email,
      country,
      phoneNumber,
      title,
      company,
    } = ctx.request.body;

    const payload = {
      id: userId,
      firstName,
      lastName,
      userName,
      email,
      country,
      phoneNumber,
      title,
      company,
    };

    userValidator.validatePatchUserPayload(payload);

    const user = await UserService.patchUser(payload);
    console.log(user);
    ctx.body = user;
  }
}
