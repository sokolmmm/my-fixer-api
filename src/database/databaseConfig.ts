import { DataSource } from 'typeorm';

const appSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  username: 'sokol',
  password: '12345',
  synchronize: false,
  logging: false,
  ssl: false,
  entities: [
    'src/**/entities/*.ts',
  ],
  migrations: ['dist/migrations/*.js'],
});

export default appSource;
