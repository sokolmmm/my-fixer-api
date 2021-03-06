/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne,
} from 'typeorm';
import Profile from '../../profile/entities/profile.repository';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    firstName: string;

  @Column()
    lastName: string;

  @Column()
    email: string;

  @Column({
    nullable: true,
  })
    country: string;

  @Column({
    nullable: true,
  })
    phoneNumber: string;

  @Column({
    nullable: true,
  })
    title: string;

  @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile;
}
