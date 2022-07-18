import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const appSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: process.env.DATABASE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  synchronize: false,
  logging: false,
  ssl: false,
  entities: [
    'src/**/entities/*.ts',
  ],
  migrations: ['dist/migrations/*.js'],
});

export default appSource;
