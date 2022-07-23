import AuthService from './auth.service';

import { IAppContext } from '../types/interface';

export default class AuthController {
  static async login(ctx: IAppContext) {
    const user = ctx.user.auth();

    ctx.cookies.set('refresh', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    await AuthService.login(user);

    ctx.body = user;
  }

  static async logout(ctx: IAppContext) {
    const { user } = ctx;

    ctx.cookies.set('refresh', '');

    const signOut = await AuthService.logout(user.id);

    ctx.body = signOut;
  }

  static async refresh(ctx: IAppContext) {
    const refreshToken = ctx.cookies.get('refresh');

    const payload = ctx.user;

    const user = await AuthService.refreshToken(payload, refreshToken);

    ctx.cookies.set('refresh', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    ctx.body = user;
  }
}
