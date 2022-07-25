import jwt, { TokenExpiredError } from 'jsonwebtoken';

import User from '../../../user/entities/user.repository';
import dataSource from '../../../database/databaseConfig';
import defaultConfig from '../../../config/default';

import { IAppContext, IUserTokenPayload } from '../../../types/interface';
import { UnauthorizedError } from '../../errors';

export default async function jwtStrategy(ctx: IAppContext, next: () => Promise<any>) {
  try {
    const header = ctx.header.authorization;
    const [prefix, token] = header.split(' ');

    if (prefix !== 'Bearer') throw new UnauthorizedError('The user is not authorized to access this resource');

    const payload: IUserTokenPayload = jwt.verify(
      token,
      defaultConfig.jwt.accessSecret,
    ) as IUserTokenPayload;

    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('profile.stack', 'stack')
      .select(['user', 'profile.rating', 'stack.title'])
      .where('user.id = :id', { id: payload.id })
      .getOne();

    ctx.user = user;
  } catch (error: any | UnauthorizedError) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError('TokenExpiredError');
    }
    throw new UnauthorizedError('The user is not authorized to access this resource');
  }

  await next();
}
