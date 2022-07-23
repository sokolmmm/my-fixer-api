import User from '../user/entities/user.repository';
import Token from './entities/token.repository';
import dataSource from '../database/databaseConfig';

import { IUserAuth } from '../types/interface';
import { UnauthorizedError } from '../utils/errors';

export default class AuthService {
  static async login(payload: IUserAuth) {
    const { id, refreshToken } = payload;

    const tokenInDB = await dataSource
      .getRepository(Token)
      .createQueryBuilder('token')
      .where('token.userId = :userId', { userId: id })
      .getOne();

    if (tokenInDB && tokenInDB.refreshToken) {
      const token = await dataSource
        .getRepository(Token)
        .createQueryBuilder('token')
        .update({ refreshToken })
        .where('userId = :userId', { userId: id })
        .execute();

      return token;
    }

    const token = await dataSource.createEntityManager().save(Token, {
      userId: id,
      refreshToken,
    });

    return token;
  }

  static async logout(id: number) {
    await dataSource
      .getRepository(Token)
      .createQueryBuilder('token')
      .delete()
      .where('userId = :userId', { userId: id })
      .execute();
  }

  static async refreshToken(payload: User, refreshToken: string) {
    const tokenInDB = await dataSource
      .getRepository(Token)
      .createQueryBuilder('token')
      .where('token.userId = :userId', { userId: payload.id })
      .getOne();

    if (!tokenInDB || tokenInDB.refreshToken !== refreshToken) {
      throw new UnauthorizedError('The user is not authorized to access this resource');
    }

    const user = payload.auth();

    await dataSource
      .getRepository(Token)
      .createQueryBuilder('token')
      .update({ refreshToken: user.refreshToken })
      .where('userId = :userId', { userId: user.id })
      .execute();

    return user;
  }
}
