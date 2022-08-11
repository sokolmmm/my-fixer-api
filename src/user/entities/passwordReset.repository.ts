/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */

import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne,
} from 'typeorm';
import { createHmac } from 'node:crypto';

import defaultConfig from '../../config/default';
import Profile from '../../profile/entities/profile.repository';
import {
  EnumPersonalTitles, IUserTokenPayload, IUserInfo, IUserAuth,
} from '../../types';

@Entity()
export default class PasswordReset {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    codeHash: string;
}
