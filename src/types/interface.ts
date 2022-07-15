/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export enum EnumOrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface ICreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phoneNumber: string;
  title: string;
}

export interface ICreateProfilePayload {
  rating: number;
  stack: number;
}

export interface ISearchUsersParams {
  page?: number,
  limit?: number,
  orderBy?: EnumOrderBy,
}
