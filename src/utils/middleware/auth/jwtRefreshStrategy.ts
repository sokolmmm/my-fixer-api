import jwt, { TokenExpiredError } from 'jsonwebtoken';

import User from '../../../user/entities/user.repository';
import dataSource from '../../../database/databaseConfig';
import defaultConfig from '../../../config/default';

import { IAppContext, IUserTokenPayload } from '../../../types/interface';
import { UnauthorizedError, NotFoundError } from '../../errors';

export default async function jwtRefreshStrategy(ctx: IAppContext, next: () => Promise<any>) {
  try {
    const header = ctx.header.authorization;
    const [prefix, refreshToken] = header.split(' ');

    if (prefix !== 'Bearer') {
      throw new UnauthorizedError('The user is not authorized to access this resource');
    }

    const payload: IUserTokenPayload = jwt.verify(
      refreshToken,
      defaultConfig.jwt.refreshSecret,
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

    ctx.user = user;
  } catch (error: any | UnauthorizedError) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError('TokenExpiredError');
    } else if (error instanceof NotFoundError) {
      throw new NotFoundError(error.message);
    }
    throw new UnauthorizedError('The user is not authorized to access this resource');
  }

  await next();
}
