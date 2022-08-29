/* eslint-disable no-unused-vars */
import User from './entities/user.repository';
import Profile from '../profile/entities/profile.repository';
import PasswordReset from './entities/passwordReset.repository';
import awsS3 from '../utils/uploadS3';
import dataSource from '../database/databaseConfig';
import mailService from '../utils/nodemailer';

import { ICreateUserPayload, ISearchUsersParams, PostgresErrorCode } from '../types';
import { NotFoundError, ConflictError } from '../utils/errors';

export default class UserService {
  private static async getUserFromDB(id: number) {
    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('profile.stack', 'stack')
      .select(['user', 'profile.rating', 'stack.title'])
      .where({ id })
      .getOne();

    return user;
  }

  static async createUser(payload: ICreateUserPayload) {
    try {
      const passwordHash = User.createPasswordHash(payload.password);
      const user = await dataSource.createEntityManager().save(User, {
        ...payload,
        password: passwordHash,
      });

      await dataSource.createEntityManager().save(Profile, {
        user,
      });

      const userInDB = await this.getUserFromDB(user.id);

      await mailService.sendActivationMail(
        user.email,
        `http://localhost:4000/users/confirm-email/${userInDB.createLink()}`,
      );

      return userInDB;
    } catch (error: any | ConflictError) {
      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictError(`The user with email: ${payload.email} is already exist`);
      }
      throw error;
    }
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

  static async retrieveUserById(id: number) {
    const user = await this.getUserFromDB(id);

    if (!user) throw new NotFoundError(`User with id: ${id} doesn't exist`);

    return user;
  }

  static async patchUser(id: number, payload: ICreateUserPayload) {
    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .update({ ...payload })
      .where('id = :id', { id })
      .execute();

    if (!user.affected) throw new NotFoundError(`User with id: ${id} doesn't exist`);

    const userInDB = await this.getUserFromDB(id);

    return userInDB;
  }

  static async deleteById(id: number) {
    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .delete()
      .where('id = :id', { id })
      .execute();

    if (!user.affected) throw new NotFoundError(`User with id: ${id} doesn't exist`);
  }

  static async updatePhoto(id: number, email: string, photo: string) {
    const savePhoto = await awsS3.uploadS3(photo, 'users', `photos_${email}`);
    const photoUrl = savePhoto.toString();

    await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .update({ photo: photoUrl })
      .where('id = :id', { id })
      .execute();

    const userInDB = await this.getUserFromDB(id);

    return userInDB;
  }

  static async confirmEmail(user: User) {
    if (user.isEmailVerified) throw new ConflictError(`E-mail: ${user.email} is already verified`);

    await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .update({ isEmailVerified: true })
      .where('id = :id', { id: user.id })
      .execute();
  }

  static async sendResetPasswordMail(email: string) {
    const user = await dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where({ email })
      .getOne();

    if (!user) throw new NotFoundError(`User with e-mail: ${email} doesn't exist`);

    const verifyCode = PasswordReset.createCode();
    const codeHash = PasswordReset.createCodeHash(verifyCode);

    const passwordReset = await dataSource
      .getRepository(PasswordReset)
      .createQueryBuilder('password_reset')
      .where('password_reset.email = :email', { email })
      .getOne();

    if (passwordReset) {
      await dataSource
        .getRepository(PasswordReset)
        .createQueryBuilder('password_reset')
        .update({ codeHash })
        .where('password_reset.email = :email', { email })
        .execute();
    } else {
      await dataSource.createEntityManager().save(PasswordReset, {
        codeHash,
        user,
      });
    }

    await mailService.sendResetPasswordMail(user.email, verifyCode);

    return `An email was sent to ${email}`;
  }

  static async resetPassword(email: string, password: string) {
    const passwordHash = User.createPasswordHash(password);

    const userPromise = dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .update({ password: passwordHash })
      .where({ email })
      .execute();

    const passwordPromise = dataSource
      .getRepository(PasswordReset)
      .createQueryBuilder('password_reset')
      .delete()
      .where('password_reset.email = :email', { email })
      .execute();

    await Promise.all([userPromise, passwordPromise]);
  }
}
