import { DataSource, DataSourceOptions, useContainer } from "typeorm";
import { Config } from "../config";
import {} from "typeorm/container"
import Container from "typedi";

// useContainer(Container)
const typeormConfig: DataSourceOptions = {
  type: "postgres",
  url: Config.NODE_ENV === "production" ? Config.DATABASE_URL : undefined,
  host: Config.DATABASE_HOST,
  port: Number(Config.DATABASE_PORT),
  username: Config.DATABASE_USERNAME,
  password: Config.DATABASE_PASSWORD,
  database: Config.DATABASE_NAME,
  entities: [`src/apps/**/entity/*.entity.ts`],
  migrations: ["src/common/db/migrations/*.{ts, js}"],
  synchronize: false,
};

export const dataSource = new DataSource(typeormConfig);
