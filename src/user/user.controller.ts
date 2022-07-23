import { Context } from 'koa';

import UserService from './user.service';
import userValidator from './user.validator';

import { ICreateUserPayload, ISearchUsersParams, IAppContext } from '../types/interface';

export default class UserController {
  static async signIn(ctx: IAppContext) {
    const user = ctx.user.auth();

    ctx.cookies.set('refresh', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    await UserService.signIn(user);

    ctx.body = user;
  }

  static async createUser(ctx: Context) {
    const payload: ICreateUserPayload = ctx.request.body;

    userValidator.validateCreateUserPayload(payload);

    const user = await UserService.createUser(payload);

    ctx.body = user;
  }

  static async usersList(ctx: IAppContext) {
    const searchParams: ISearchUsersParams = ctx.query;

    userValidator.validateSearchUsersParams(searchParams);

    const users = await UserService.usersList(searchParams);

    ctx.body = users.map((user) => user.info());
  }

  static async retrieveUserById(ctx: Context) {
    const { userId } = ctx.params;

    const user = await UserService.retrieveUserById(userId);

    ctx.body = user;
  }

  static async patchUserById(ctx: Context) {
    const { userId } = ctx.params;

    const payload: ICreateUserPayload = ctx.request.body;

    userValidator.validatePatchUserPayload(payload);

    const user = await UserService.patchUser(userId, payload);

    ctx.body = user;
  }

  static async deleteUserById(ctx: Context) {
    const { userId } = ctx.params;

    const user = await UserService.deleteById(userId);

    ctx.body = user;
  }

  static async updatePhoto(ctx: Context) {
    const { userId } = ctx.params;
    const { photo } = ctx.request.body;

    userValidator.validateUpdateUserPhoto({ photo });

    const user = await UserService.updatePhoto(userId, photo);

    ctx.body = user;
  }
}
