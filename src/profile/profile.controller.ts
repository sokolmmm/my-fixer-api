import ProfileService from './profile.service';
import profileValidator from './profile.validator';

import { IAppContext, IPatchProfilePayload } from '../types/interface';

export default class ProfileController {
  static async patchProfileById(ctx: IAppContext) {
    const { id } = ctx.user;

    const payload: IPatchProfilePayload = ctx.request.body;

    profileValidator.validatePatchProfilePayload(payload);

    const user = await ProfileService.patchProfile(id, payload);

    ctx.body = user.info();
  }
}
