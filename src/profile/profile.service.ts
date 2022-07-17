import Profile from './entities/profile.repository';
import User from '../user/entities/user.repository';
import Stack from '../stack/entities/stack.repository';
import dataSource from '../database/databaseConfig';
import { IPatchProfilePayload } from '../types/interface';
import { NotFoundError } from '../utils/errors';

export default class ProfileService {
  static async getProfileFromDB(userId: string) {
    const profile = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('profile.stack', 'stack')
      .select(['user.id', 'profile.rating', 'stack'])
      .where('user.id = :id', { id: userId })
      .getOne();

    return profile;
  }

  static async profileById(userId: string) {
    const profile = await this.getProfileFromDB(userId);

    if (!profile) throw new NotFoundError(`User with id: ${userId} doesn't exist`);

    return profile;
  }

  static async patchProfile(userId: string, payload: IPatchProfilePayload) {
    const stack = await dataSource
      .getRepository(Stack)
      .createQueryBuilder('stack')
      .where('id = :id', { id: payload.stack })
      .getOne();

    if (!stack && payload.stack) throw new NotFoundError(`Stack with id: ${payload.stack} doesn't exist`);

    const profile = await dataSource
      .createQueryBuilder()
      .update(Profile)
      .set({
        rating: payload.rating,
        stack,
      })
      .where('userId = :userId', { userId })
      .execute();

    if (!profile.affected) throw new NotFoundError(`Profile with id: ${userId} doesn't exist`);

    const profileInDB = await this.getProfileFromDB(userId);

    return profileInDB;
  }
}
