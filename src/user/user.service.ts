import dataSource from '../database/databaseConfig';
import User from './entities/user.repository';
import Profile from '../profile/entities/profile.repository';
import awsS3 from '../utils/uploadS3';
import { ICreateUserPayload, ISearchUsersParams, IUserAuth } from '../types/interface';
import { NotFoundError } from '../utils/errors';

export default class UserService {
  private static async getUserFromDB(id: number) {
    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('profile.stack', 'stack')
      .select(['user', 'profile.rating', 'stack.title'])
      .where({ id: +id })
      .getOne();

    return user;
  }

  static async signIn(payload: IUserAuth) {
    return payload;
  }

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

  static async retrieveUserById(id: string) {
    const user = await this.getUserFromDB(+id);

    if (!user) throw new NotFoundError(`User with id: ${id} doesn't exist`);

    return user;
  }

  static async createUser(payload: ICreateUserPayload) {
    const passwordHash = User.createPassword(payload.password);

    const user = await dataSource.createEntityManager().save(User, {
      ...payload,
      password: passwordHash,
    });

    await dataSource.createEntityManager().save(Profile, {
      user,
    });

    const userInDB = await this.getUserFromDB(user.id);
    return userInDB;
  }

  static async patchUser(id: string, payload: ICreateUserPayload) {
    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .update({ ...payload })
      .where('id = :id', { id })
      .execute();

    if (!user.affected) throw new NotFoundError(`User with id: ${id} doesn't exist`);

    const userInDB = await this.getUserFromDB(+id);

    return userInDB;
  }

  static async deleteById(id: string) {
    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .delete()
      .where('id = :id', { id })
      .execute();

    if (!user.affected) throw new NotFoundError(`User with id: ${id} doesn't exist`);
  }

  static async updatePhoto(id: string, photo: string) {
    let user = await this.getUserFromDB(+id);

    if (!user) throw new NotFoundError(`User with id: ${id} doesn't exist`);

    const savePhoto = await awsS3.uploadS3(photo, 'users', `photos_${user.email}`);
    const photoUrl = savePhoto.toString();

    await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .update({ photo: photoUrl })
      .where('id = :id', { id })
      .execute();

    user = await this.getUserFromDB(+id);

    return user;
  }
}
