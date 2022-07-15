import { ICreateProfilePayload } from '../types/interface';
// import { NotFoundError } from '../utils/errors';
import Profile from './entities/profile.repository';
import dataSource from '../database/databaseConfig';
import User from '../user/entities/user.repository';
import Stack from '../stack/entities/stack.repository';

export default class ProfileService {
  static async createProfile(userId: string, payload: ICreateProfilePayload) {
    const user = await dataSource.getRepository(User).findOne({
      where: {
        id: +userId,
      },
    });

    const stack = await dataSource.getRepository(Stack).findOne({
      where: {
        id: +payload.stack,
      },
    });

    await dataSource.createEntityManager().save(Profile, {
      rating: payload.rating,
      user,
      stack,
    });

    const profile = this.profileById(userId);
    return profile;
  }

  static async patchProfile(userId: string, payload: ICreateProfilePayload) {
    const stack = await dataSource.getRepository(Stack).findOne({
      where: {
        id: +payload.stack,
      },
    });

    await dataSource
      .createQueryBuilder()
      .update(Profile)
      .set({
        rating: payload.rating,
        stack,
      })
      .where('userId = :userId', { userId })
      .execute();

    const profile = this.profileById(userId);
    return profile;
  }

  static async profileById(userId: string) {
    const profile = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('profile.stack', 'stack')
      .select(['user.id', 'profile.rating', 'stack.title'])
      .where('user.id = :id', { id: userId })
      .getOne();

    return profile;
  }
}
