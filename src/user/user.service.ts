import fs from 'fs';
import { ICreateUserPayload } from '../types/interface';
import User, { IMapUser } from './user.repository';
import { NotFoundError } from '../utils/errors';

export default class UserService {
  static async usersList() {
    const users = fs.readFileSync('db.json').toString();
    return users;
  }

  static async userById(uuid: string) {
    const usersList = fs.readFileSync('db.json').toString();

    const users: IMapUser[] = JSON.parse(usersList);

    const user = users.find((el) => el.id === uuid);

    if (!user) throw new NotFoundError(`User with id: ${uuid} doesn't exist`);
    return user;
  }

  static async createUser(payload: ICreateUserPayload) {
    const user = new User();
    user.setUserData = payload;
    user.createUserInDB();
    return user;
  }

  static async patchUser(userData: ICreateUserPayload) {
    const usersList = fs.readFileSync('db.json').toString();

    const users: IMapUser[] = JSON.parse(usersList);

    const userPrevData :ICreateUserPayload = users.find((el) => el.id === userData.id);

    if (!userPrevData) throw new NotFoundError(`User with id: ${userData.id} doesn't exist`);

    const payload = {
      id: userData.id,
      firstName: userData.firstName || userPrevData.firstName,
      lastName: userData.lastName || userPrevData.lastName,
      userName: userData.userName || userPrevData.userName,
      email: userData.email || userPrevData.email,
      country: userData.country || userPrevData.country,
      phoneNumber: userData.phoneNumber || userPrevData.phoneNumber,
      title: userData.title || userPrevData.title,
      company: userData.company || userPrevData.company,
    };

    const user = new User();
    user.setUserData = payload;
    user.patchUserInDB();
    return user;
  }
}
