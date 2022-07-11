import Joi from 'joi';
import { ValidationError } from '../utils/errors';
import { ICreateUserPayload } from '../types/interface';

class UserValidator {
  private createUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    lastName: Joi.string().min(3).max(10).required(),
    userName: Joi.string().min(3).max(10).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }).required(),
    country: Joi.string().min(3).max(10),
    phoneNumber: Joi.string().min(3).max(10),
    title: Joi.string().min(2).max(10),
    company: Joi.string().min(3).max(10),
  });

  private patchUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(10),
    lastName: Joi.string().min(3).max(10),
    userName: Joi.string().min(3).max(10),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    country: Joi.string().min(3).max(10),
    phoneNumber: Joi.string().min(3).max(10),
    title: Joi.string().min(2).max(10),
    company: Joi.string().min(3).max(10),
  });

  public validateCreateUserPayload(payload: ICreateUserPayload) {
    const result = this.createUserSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validatePatchUserPayload(payload: ICreateUserPayload) {
    const result = this.patchUserSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default new UserValidator();
