import { Context } from 'koa';

import ProfileService from './profile.service';
import { IPatchProfilePayload } from '../types/interface';
import profileValidator from './profile.validator';

export default class ProfileController {
  static async patchProfileById(ctx: Context) {
    const { userId } = ctx.params;

    const payload: IPatchProfilePayload = ctx.request.body;

    profileValidator.validatePatchProfilePayload(payload);

    const profile = await ProfileService.patchProfile(userId, payload);

    ctx.body = profile;
  }

  static async retrieveProfileById(ctx: Context) {
    const { userId } = ctx.params;

    const profile = await ProfileService.profileById(userId);

    ctx.body = profile;
  }
}
