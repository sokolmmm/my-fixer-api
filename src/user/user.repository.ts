import { v4 as uuidv4 } from 'uuid';

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

  constructor(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
  ) {
    this.id = uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
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
}
