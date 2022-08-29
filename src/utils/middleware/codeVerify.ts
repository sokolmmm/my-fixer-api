import PasswordReset from '../../user/entities/passwordReset.repository';
import dataSource from '../../database/databaseConfig';

import { IAppContext } from '../../types/interface';
import { ValidationError, ForbiddenError } from '../errors';

export default async function codeVerify(ctx: IAppContext, next: () => Promise<any>) {
  const { code, email } = ctx.request.body;

  if (!code) {
    throw new ValidationError('Code is required');
  } else if (!email) {
    throw new ValidationError('Email is required');
  }

  const user = await dataSource
    .getRepository(PasswordReset)
    .createQueryBuilder('password_reset')
    .where('password_reset.email = :email', { email })
    .getOne();

  if (!user || user.codeHash !== PasswordReset.createCodeHash(code)) {
    throw new ForbiddenError('Forbidden');
  }

  await next();
}
