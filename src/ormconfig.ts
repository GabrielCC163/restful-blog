import 'dotenv/config';

import { getConfig } from '@config/app.config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';

const appConfig = getConfig();

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: appConfig.database.host,
  port: appConfig.database.port,
  username: appConfig.database.user,
  password: appConfig.database.password,
  database: appConfig.database.name,
  synchronize: false,
  migrationsRun: false,
  logging: false,
  connectTimeoutMS: 10000,
  maxQueryExecutionTime: 100,
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
};

export default new DataSource({
  ...config,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
});
