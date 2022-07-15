/* eslint-disable no-unused-vars */
import { ICreateUserPayload, ISearchUsersParams } from '../types/interface';
import { NotFoundError } from '../utils/errors';
import dataSource from '../database/databaseConfig';
import User from './entities/user.repository';

export default class UserService {
  static async usersList(params: ISearchUsersParams) {
    // const users = await dataSource.getRepository(User).find();
    // return users;

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
    const users = await dataSource.getRepository(User).findOne({
      where: {
        id: +id,
      },
    });

    return users;
  }

  static async createUser(payload: ICreateUserPayload) {
    const user = await dataSource.createEntityManager().save(User, {
      ...payload,
    });

    return user;
  }

  static async patchUser(id: string, payload: ICreateUserPayload) {
    await dataSource.createEntityManager().update(User, id, {
      ...payload,
    });

    const user = this.userById(id);
    return user;
  }

  static async deleteById(id: number) {
    await dataSource.createEntityManager().delete(User, id);
  }
}
