import { DataSource, DataSourceOptions } from "typeorm";
import { Config } from "../config";

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
