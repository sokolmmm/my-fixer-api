import Joi from 'joi';

import { ValidationError } from '../utils/errors';
import { IPatchProfilePayload } from '../types/interface';

class ProfileValidator {
  private patchProfileSchema = Joi.object({
    stack: Joi.number().positive(),
    rating: Joi.number().min(0).max(5),
  });

  public validatePatchProfilePayload(payload: IPatchProfilePayload) {
    const result = this.patchProfileSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default new ProfileValidator();
