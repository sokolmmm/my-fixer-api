import User from '../../../user/entities/user.repository';
import dataSource from '../../../database/databaseConfig';

import { IAppContext } from '../../../types/interface';
import { ValidationError, UnauthorizedError } from '../../errors';

export default async function localStrategy(ctx: IAppContext, next: () => Promise<any>) {
  const { body } = ctx.request;

  if (typeof body.password !== 'string') throw new ValidationError('Password must be a string');
  if (typeof body.email !== 'string') throw new ValidationError('E-mail must be a string');

  const passwordHash = User.createPassword(body.password);

  const user = await dataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.profile', 'profile')
    .leftJoinAndSelect('profile.stack', 'stack')
    .select(['user', 'profile.rating', 'stack.title'])
    .where('email = :email', { email: body.email })
    .andWhere('password = :password', { password: passwordHash })
    .getOne();

  if (!user) throw new UnauthorizedError('E-mail or password is wrong');

  ctx.user = user;

  await next();
}
