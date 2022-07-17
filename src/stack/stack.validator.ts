import Joi from 'joi';

import { ValidationError } from '../utils/errors';
import { ICreateStackPayload } from '../types/interface';

class StackValidator {
  private createStackSchema = Joi.object({
    title: Joi.string().min(2).max(10).required(),
  });

  public validateCreateStackPayload(payload: ICreateStackPayload) {
    const result = this.createStackSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default new StackValidator();
