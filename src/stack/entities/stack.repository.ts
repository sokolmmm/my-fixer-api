/* eslint-disable import/no-cycle */
import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import Profile from '../../profile/entities/profile.repository';

@Entity()
export default class Stack {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    title: string;

  @OneToMany(() => Profile, (profile) => profile.stack)
    profile: Profile[];
}
