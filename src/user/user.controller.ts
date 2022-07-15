import { Context } from 'koa';
import UserService from './user.service';
import userValidator from './user.validator';
import { ICreateUserPayload, ISearchUsersParams } from '../types/interface';

export default class UserController {
  static async usersList(ctx: Context) {
    const searchParams: ISearchUsersParams = ctx.query;

    userValidator.validateSearchUsersParams(searchParams);

    const users = await UserService.usersList(searchParams);

    ctx.body = users;
  }

  static async retrieveUserById(ctx: Context) {
    const { userId } = ctx.params;

    const user = await UserService.userById(userId);

    ctx.body = user;
  }

  static async createUser(ctx: Context) {
    const payload: ICreateUserPayload = ctx.request.body;

    userValidator.validateCreateUserPayload(payload);

    const user = await UserService.createUser(payload);

    ctx.body = user;
  }

  static async patchUserById(ctx: Context) {
    const { userId } = ctx.params;

    const payload: ICreateUserPayload = ctx.request.body;

    // userValidator.validatePatchUserPayload(payload);

    const user = await UserService.patchUser(userId, payload);
    console.log(user);
    ctx.body = user;
  }

  static async deleteUserById(ctx: Context) {
    const { userId } = ctx.params;

    const user = await UserService.deleteById(userId);

    ctx.body = user;
  }
}
