/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';

import User from '../../../user/entities/user.repository';
import dataSource from '../../../database/databaseConfig';
import defaultConfig from '../../../config/default';

import { IAppContext, IUserTokenPayload } from '../../../types/interface';
import { ValidationError, AuthenticationError } from '../../errors';

export default async function jwtStrategy(ctx: IAppContext, next: () => Promise<any>) {
  const header = ctx.header.authorization;

  const [prefix, token] = header.split(' ');

  const payload: IUserTokenPayload = jwt.verify(token, defaultConfig.jwt.accessSecret) as IUserTokenPayload;

  const user = await dataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.profile', 'profile')
    .leftJoinAndSelect('profile.stack', 'stack')
    .select(['user', 'profile.rating', 'stack.title'])
    .where('user.id = :id', { id: payload.id })
    .getOne();

  ctx.user = user;

  await next();
}
