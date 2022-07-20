import Joi from 'joi';

import { ValidationError } from '../utils/errors';
import {
  ICreateUserPayload,
  ISearchUsersParams,
  EnumOrderBy,
  EnumPhotoExtensions,
  IUpdateUserPhoto,
  IBase64Photo,
} from '../types/interface';

class UserValidator {
  private createUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    lastName: Joi.string().min(3).max(10).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
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

  private updateUserPhotoSchema = Joi.object({
    photo: Joi.string().dataUri(),
  });

  private base64PhotoSchema = Joi.object({
    photo: Joi.string().base64().max(2796202).messages({
      'string.max': 'The picture must be smaller than 2 MB',
    }),
    extension: Joi.string().valid(
      EnumPhotoExtensions.JPEG,
      EnumPhotoExtensions.JPG,
      EnumPhotoExtensions.PNG,
      EnumPhotoExtensions.SVG,
      EnumPhotoExtensions.GIF,
    ),
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

  public validateUpdateUserPhoto(payload: IUpdateUserPhoto) {
    const result = this.updateUserPhotoSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validateBase64Photo(payload: IBase64Photo) {
    const result = this.base64PhotoSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default new UserValidator();
