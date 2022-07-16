import Joi from 'joi';

import { ValidationError } from '../utils/errors';
import { ICreateUserPayload, ISearchUsersParams, EnumOrderBy } from '../types/interface';

class UserValidator {
  private createUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    lastName: Joi.string().min(3).max(10).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }).required(),
    country: Joi.string().min(3).max(10),
    phoneNumber: Joi.string().min(3).max(10),
    title: Joi.string().min(2).max(10),
  });

  private patchUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(10),
    lastName: Joi.string().min(3).max(10),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    country: Joi.string().min(3).max(10),
    phoneNumber: Joi.string().min(3).max(10),
    title: Joi.string().min(2).max(10),
  });

  private searchUsersSchema = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(2).max(50),
    orderBy: Joi.string().valid(EnumOrderBy.ASC, EnumOrderBy.DESC),
  });

  public validateCreateUserPayload(payload: ICreateUserPayload) {
    const result = this.createUserSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validatePatchUserPayload(payload: ICreateUserPayload) {
    const result = this.patchUserSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validateSearchUsersParams(payload: ISearchUsersParams) {
    const result = this.searchUsersSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default new UserValidator();
