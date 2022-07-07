import fs from 'fs';
import User, { IMapUser } from './user.repository';
import { NotFoundError } from '../utils/errors';
import { ICreateUserPayload } from '../types/interface';

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
    const user = new User(payload).createUserInDB();
    return user;
  }
}
