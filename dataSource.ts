import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({
  path: `${__dirname}/src/config/env/.${process.env.NODE_ENV}.env`,
});

// typeorm-extension은 app.ts의 이걸 못읽기 때문에 여기에 따로 작성해 놓는 것
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/**/migrations/*.js'],
  migrationsTableName: 'migration',
});
