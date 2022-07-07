// import User from './user.repository';
import fs from 'fs';

export default class UserService {
  static async usersList() {
    const users = fs.readFileSync('db.json');
    return users.toString();
  }
}
