import { IAppContext } from '../../types/interface';
import { ForbiddenError } from '../errors';

export default async function activationChecker(ctx: IAppContext, next: () => Promise<any>) {
  const { isEmailVerified } = ctx.user;

  if (!isEmailVerified) throw new ForbiddenError('The account is not activated. Please check your e-mail');

  await next();
}
