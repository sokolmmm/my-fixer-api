/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';

import User from '../../../user/entities/user.repository';
import dataSource from '../../../database/databaseConfig';
import defaultConfig from '../../../config/default';

import { IAppContext, IUserTokenPayload } from '../../../types/interface';
import { UnauthorizedError } from '../../errors';

export default async function jwtRefreshStrategy(ctx: IAppContext, next: () => Promise<any>) {
  try {
    const refreshToken = ctx.cookies.get('refresh');

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

    ctx.user = user;
  } catch (error: any | UnauthorizedError) {
    throw new UnauthorizedError('The user is not authorized to access this resource');
  }

  await next();
}
