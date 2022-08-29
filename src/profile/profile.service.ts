import Profile from './entities/profile.repository';
import User from '../user/entities/user.repository';
import Stack from '../stack/entities/stack.repository';
import dataSource from '../database/databaseConfig';
import { IPatchProfilePayload } from '../types/interface';
import { NotFoundError } from '../utils/errors';

export default class ProfileService {
  private static async getUser(id: number) {
    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('profile.stack', 'stack')
      .select(['user', 'profile.rating', 'stack.title'])
      .where('user.id = :id', { id })
      .getOne();

    return user;
  }

  static async patchProfile(userId: number, payload: IPatchProfilePayload) {
    const stack = await dataSource
      .getRepository(Stack)
      .createQueryBuilder('stack')
      .where('id = :id', { id: payload.stack })
      .getOne();

    if (!stack && payload.stack) { throw new NotFoundError(`Stack with id: ${payload.stack} doesn't exist`); }

    const profile = await dataSource
      .createQueryBuilder()
      .update(Profile)
      .set({
        rating: payload.rating,
        stack,
      })
      .where('userId = :userId', { userId })
      .execute();

    if (!profile.affected) throw new NotFoundError(`User with id: ${userId} doesn't exist`);
    const user = await this.getUser(userId);

    return user;
  }
}
