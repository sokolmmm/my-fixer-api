/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */

import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,
} from 'typeorm';
import { createHmac } from 'node:crypto';

import defaultConfig from '../../config/default';
import Profile from '../../profile/entities/profile.repository';
import {
  EnumPersonalTitles, IUserTokenPayload, IUserInfo, IUserAuth,
} from '../../types';
import User from './user.repository';

@Entity()
export default class PasswordReset {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    codeHash: string;

  @OneToOne(() => User, (user) => user.email, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
    user: User;

  static createCode(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  static createCodeHash(code: string): string {
    const secret = defaultConfig.secrets.verifyCode;
    const hash = createHmac('sha256', secret).update(code).digest('hex');

    return hash;
  }
}
