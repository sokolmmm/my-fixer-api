/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export enum EnumOrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum EnumPersonalTitles {
  MR = 'mr',
  MRS = 'mrs',
  MS = 'ms',
  MISS = 'miss',
}

export enum EnumPhotoExtensions {
  JPEG = 'jpeg',
  JPG = 'jpg',
  PNG = 'png',
  SVG = 'svg',
  GIF = 'gif'
}

export interface ICreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phoneNumber: string;
  title: string;
}

export interface IPatchProfilePayload {
  rating: number;
  stack: number;
}

export interface ISearchUsersParams {
  page?: number;
  limit?: number;
  orderBy?: EnumOrderBy;
}

export interface ICreateStackPayload {
  title: string;
}

export interface IUpdateUserPhoto {
  photo: string;
}

export interface IBase64Photo {
  photo: string;
  extension: string,
}
