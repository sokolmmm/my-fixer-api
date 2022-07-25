/* eslint-disable import/no-cycle */
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class Token {
  @PrimaryColumn()
    userId: number;

  @Column()
    refreshToken: string;
}
