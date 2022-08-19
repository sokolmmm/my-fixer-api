import UserService from './user.service';
import userValidator from './user.validator';

import { IAppContext, ICreateUserPayload, ISearchUsersParams } from '../types/interface';

export default class UserController {
  static async createUser(ctx: IAppContext) {
    const payload: ICreateUserPayload = ctx.request.body;

    userValidator.validateCreateUserPayload(payload);

    const user = await UserService.createUser(payload);

    ctx.body = user.info();
  }

  static async usersList(ctx: IAppContext) {
    const searchParams: ISearchUsersParams = ctx.query;

    userValidator.validateSearchUsersParams(searchParams);

    const users = await UserService.usersList(searchParams);

    ctx.body = users.map((user) => user.info());
  }

  static async patchUserById(ctx: IAppContext) {
    const { user } = ctx;

    const payload: ICreateUserPayload = ctx.request.body;

    userValidator.validatePatchUserPayload(payload);

    await UserService.patchUser(user.id, payload);

    ctx.body = user.info();
  }

  static async retrieveUserById(ctx: IAppContext) {
    const { userId } = ctx.params;

    const user = await UserService.retrieveUserById(userId);

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

    await UserService.updatePhoto(user.id, user.email, photo);

    ctx.body = user.info();
  }

  static async confirmEmail(ctx: IAppContext) {
    const { user } = ctx;

    await UserService.confirmEmail(user);
    ctx.redirect('http://localhost:3000/sign-up/complete-account-successful');
  }

  static async sendResetPasswordMail(ctx: IAppContext) {
    const { email } = ctx.request.body;

    const user = await UserService.sendResetPasswordMail(email);

    ctx.body = user;
  }

  static async resetPassword(ctx: IAppContext) {
    const { email, password } = ctx.request.body;

    userValidator.validatePassword(password);

    await UserService.resetPassword(email, password);

    ctx.body = 'The password was changed successfully';
  }
}
