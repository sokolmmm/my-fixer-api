/* eslint-disable no-unused-vars */
import { Context } from 'koa';

import UserService from './user.service';
import userValidator from './user.validator';
import Base64 from '../helpers/base64';
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

    const user = await UserService.retrieveUserById(userId);

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

    const extension = Base64.getExtension(photo);
    const photoBody = Base64.getBody(photo);

    userValidator.validateBase64Photo({ photo: photoBody, extension });

    const user = await UserService.updatePhoto(userId, photo);

    ctx.body = user;
  }
}
