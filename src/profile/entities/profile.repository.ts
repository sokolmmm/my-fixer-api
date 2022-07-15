/* eslint-disable import/no-cycle */
import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne,
} from 'typeorm';
import Stack from '../../stack/entities/stack.repository';
import User from '../../user/entities/user.repository';

@Entity()
export default class Profile {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    nullable: true,
  })
    rating: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
    user: User;

  @ManyToOne(() => Stack, (stack) => stack.profile)
    stack: Stack;
}
