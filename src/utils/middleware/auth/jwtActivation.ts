import jwt, { TokenExpiredError } from 'jsonwebtoken';

import User from '../../../user/entities/user.repository';
import dataSource from '../../../database/databaseConfig';
import defaultConfig from '../../../config/default';

import { IAppContext, IUserTokenPayload } from '../../../types/interface';
import { ForbiddenError, ConflictError, NotFoundError } from '../../errors';

export default async function jwtActivation(ctx: IAppContext, next: () => Promise<any>) {
  try {
    const { activationLink } = ctx.params;

    const payload: IUserTokenPayload = jwt.verify(
      activationLink,
      defaultConfig.jwt.activationLink,
    ) as IUserTokenPayload;

    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('profile.stack', 'stack')
      .select(['user', 'profile.rating', 'stack.title'])
      .where('user.id = :id', { id: payload.id })
      .getOne();

    if (!user) throw new NotFoundError(`User with id: ${payload.id} doesn't exist`);
    if (user.isEmailVerified) throw new ConflictError(`E-mail: ${user.email} is already verified`);

    ctx.user = user;
  } catch (error: any | ForbiddenError) {
    if (error instanceof TokenExpiredError) {
      throw new ForbiddenError('Forbidden');
    }
    throw error;
  }

  await next();
}
