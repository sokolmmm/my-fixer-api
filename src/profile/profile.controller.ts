import { Context } from 'koa';
import { ICreateProfilePayload } from '../types/interface';
import ProfileService from './profile.service';

export default class ProfileController {
  static async createProfile(ctx: Context) {
    const { userId } = ctx.params;

    const payload: ICreateProfilePayload = ctx.request.body;

    // userValidator.validateCreateUserPayload(payload);

    const user = await ProfileService.createProfile(userId, payload);

    ctx.body = user;
  }

  static async patchProfileById(ctx: Context) {
    const { userId } = ctx.params;

    const payload: ICreateProfilePayload = ctx.request.body;

    // userValidator.validateCreateUserPayload(payload);

    const profile = await ProfileService.patchProfile(userId, payload);

    ctx.body = profile;
  }

  static async retrieveProfileById(ctx: Context) {
    const { userId } = ctx.params;

    const profile = await ProfileService.profileById(userId);

    ctx.body = profile;
  }
}
