import { DataSource } from 'typeorm';

import defaultConfig from '../../config/default';

const appSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: defaultConfig.database.name,
  username: defaultConfig.database.username,
  password: defaultConfig.database.password,
  synchronize: false,
  logging: false,
  ssl: false,
  entities: ['src/**/entities/*.ts'],
  migrations: ['dist/migrations/*.js'],
});

export default appSource;
