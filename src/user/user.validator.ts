import Joi from 'joi';
import { ValidationError } from '../utils/errors';
import { ICreateUserPayload } from '../types/interface';

class UserValidator {
  private createUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    userName: Joi.string().min(3).max(10).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  });

  public validateCreateUserPayload(payload: ICreateUserPayload) {
    const result = this.createUserSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default new UserValidator();
