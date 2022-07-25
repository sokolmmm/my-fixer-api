// import AuthService from './auth.service';

import { IAppContext } from '../types/interface';

export default class AuthController {
  static async signIn(ctx: IAppContext) {
    const user = ctx.user.auth();

    ctx.body = user;
  }

  static async refresh(ctx: IAppContext) {
    const user = ctx.user.auth();

    ctx.body = user;
  }
}
