import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { ICreateUserPayload } from '../types/interface';

export interface IMapUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  title: string;
  company: string;
}

export default class User {
  public id: string;

  public firstName: string;

  public lastName: string;

  public userName: string;

  public email: string;

  public country: string;

  public phoneNumber: string;

  public title: string;

  public company: string;

  public set setUserData(payload: ICreateUserPayload) {
    this.id = payload.id || uuidv4();
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.userName = payload.userName;
    this.email = payload.email;
    this.country = payload.country || '';
    this.phoneNumber = payload.phoneNumber || '';
    this.title = payload.title || '';
    this.company = payload.company || '';
  }

  public mapUser(): IMapUser {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      email: this.email,
      country: this.country,
      phoneNumber: this.phoneNumber,
      title: this.title,
      company: this.company,
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

  public patchUserInDB() {
    const data = fs.readFileSync('db.json').toString();

    const usersList: IMapUser[] = JSON.parse(data);

    const userIndex: number = usersList.findIndex((el) => el.id === this.id);

    const userData = this.mapUser();

    usersList[userIndex] = userData;

    fs.writeFileSync('db.json', JSON.stringify(usersList));

    return this.mapUser();
  }
}
