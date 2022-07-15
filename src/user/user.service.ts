/* eslint-disable no-unused-vars */
import dataSource from '../database/databaseConfig';
import User from './entities/user.repository';
import Profile from '../profile/entities/profile.repository';
import { ICreateUserPayload, ISearchUsersParams } from '../types/interface';
import { NotFoundError } from '../utils/errors';

export default class UserService {
  static async usersList(params: ISearchUsersParams) {
    const users = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('profile.stack', 'stack')
      .select(['user', 'profile.rating', 'stack.title'])
      .take(params.limit)
      .skip(params.limit * (params.page - 1) || 0)
      .orderBy('user.id', params.orderBy)
      .getMany();

    return users;
  }

  static async userById(id: string) {
    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('profile.stack', 'stack')
      .select(['user', 'profile.rating', 'stack.title'])
      .where({ id: +id })
      .getOne();

    if (!user) throw new NotFoundError(`User with id: ${id} doesn't exist`);

    return user;
  }

  static async createUser(payload: ICreateUserPayload) {
    const user = await dataSource.createEntityManager().save(User, {
      ...payload,
    });

    const profile = await dataSource.createEntityManager().save(Profile, {
      user,
    });

    return user;
  }

  static async patchUser(id: string, payload: ICreateUserPayload) {
    const user = await dataSource.createEntityManager().update(User, id, {
      ...payload,
    });

    if (!user) throw new NotFoundError(`User with id: ${id} doesn't exist`);

    return this.userById(id);
  }

  static async deleteById(id: number) {
    const user = await dataSource.createEntityManager().delete(User, id);
  }
}
