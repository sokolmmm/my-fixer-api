import { Context } from 'koa';

import UserService from './user.service';
import userValidator from './user.validator';

import { ICreateUserPayload, ISearchUsersParams, IAppContext } from '../types/interface';

export default class UserController {
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

  static async patchUserById(ctx: IAppContext) {
    const { id } = ctx.user;

    const payload: ICreateUserPayload = ctx.request.body;

    userValidator.validatePatchUserPayload(payload);

    const user = await UserService.patchUser(id, payload);

    ctx.body = user.info();
  }

  static async deleteUserById(ctx: IAppContext) {
    const { id } = ctx.user;

    const user = await UserService.deleteById(id);

    ctx.body = user;
  }

  static async updatePhoto(ctx: IAppContext) {
    const { user } = ctx;

    const { photo } = ctx.request.body;

    userValidator.validateUpdateUserPhoto({ photo });

    const userPhoto = await UserService.updatePhoto(user.id, photo);

    ctx.body = userPhoto;
  }
}
