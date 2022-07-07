import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { ICreateUserPayload } from '../types/interface';

export interface IMapUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

export default class User {
  public id: string;

  public firstName: string;

  public lastName: string;

  public userName: string;

  public email: string;

  constructor(payload: ICreateUserPayload) {
    this.id = uuidv4();
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.userName = payload.userName;
    this.email = payload.email;
  }

  public mapUser(): IMapUser {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      email: this.email,
    };
  }

  public entityToString(): string {
    return JSON.stringify(this.mapUser());
  }

  public createUserInDB() {
    const data = fs.readFileSync('db.json').toString();

    const usersList: IMapUser[] = JSON.parse(data);

    const userData = this.mapUser();

    usersList.push(userData);

    fs.writeFileSync('db.json', JSON.stringify(usersList));

    return this.mapUser();
  }
}
