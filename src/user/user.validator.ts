import Joi from 'joi';

import Base64 from '../helpers/base64';
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
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(15).required(),
    country: Joi.string().min(3).max(35),
    phoneNumber: Joi.string().min(3).max(15),
    title: Joi.string().min(2).max(10),
  });

  private patchUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(10),
    lastName: Joi.string().min(3).max(10),
    email: Joi.string().email().required(),
    country: Joi.string().min(3).max(25),
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
    photo: Joi.string(),
    extension: Joi.string().valid(
      EnumPhotoExtensions.JPEG,
      EnumPhotoExtensions.JPG,
      EnumPhotoExtensions.PNG,
      EnumPhotoExtensions.SVG,
      EnumPhotoExtensions.GIF,
    ),
  });

  private resetPasswordSchema = Joi.object({
    password: Joi.string().min(3).max(15).required(),
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

    const photo = Base64.getBody(payload.photo);
    const extension = Base64.getExtension(payload.photo);

    const base64Result = this.base64PhotoSchema.validate({ photo, extension });

    if (base64Result.error) throw new ValidationError(base64Result.error.message);
  }

  public validateBase64Photo(payload: IBase64Photo) {
    const result = this.base64PhotoSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validatePassword(password: string) {
    const result = this.resetPasswordSchema.validate({ password });
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default new UserValidator();
