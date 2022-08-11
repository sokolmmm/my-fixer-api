/* eslint-disable import/no-cycle */
import jwt from 'jsonwebtoken';

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
export default class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    firstName: string;

  @Column()
    lastName: string;

  @Column({
    unique: true,
  })
    email: string;

  @Column()
    password: string;

  @Column({
    nullable: true,
  })
    country: string;

  @Column({
    nullable: true,
  })
    phoneNumber: string;

  @Column({
    type: 'enum',
    enum: EnumPersonalTitles,
    nullable: true,
  })
    title: string;

  @Column({
    nullable: true,
  })
    photo: string;

  @Column({
    // type: 'boolean',
    default: false,
  })
    isEmailVerified: boolean;

  @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile;

  static createPassword(password: string) {
    const { secret } = defaultConfig;
    const hash = createHmac('sha256', secret).update(password).digest('hex');

    return hash;
  }

  public info(): IUserInfo {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      country: this.country,
      phoneNumber: this.phoneNumber,
      title: this.title,
      photo: this.photo,
      profile: this.profile,
    };
  }

  public auth(): IUserAuth {
    const payload: IUserTokenPayload = {
      id: this.id,
      email: this.email,
    };

    const accessToken: string = jwt.sign(payload, defaultConfig.jwt.accessSecret, {
      expiresIn: '15m',
    });
    const refreshToken: string = jwt.sign(payload, defaultConfig.jwt.refreshSecret, {
      expiresIn: '15d',
    });

    return {
      ...this.info(),
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  public activationLink(): string {
    const payload: IUserTokenPayload = {
      id: this.id,
      email: this.email,
    };
    const activationLinkToken = jwt.sign(payload, defaultConfig.jwt.activationLink, {
      expiresIn: '1d',
    });
    return activationLinkToken;
  }
}
