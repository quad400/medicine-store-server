import * as dotenv from "dotenv";

dotenv.config();
// export const Config = {
//   NODE_ENV: process.env.NODE_ENV,
//   PORT: process.env.PORT,
//   DATABASE_URL: process.env.DATABASE_URL,
//   DATABASE_HOST: process.env.DATABASE_HOST,
//   DATABASE_PORT: process.env.DATABASE_PORT,
//   DATABASE_USERNAME: process.env.DATABASE_USERNAME,
//   DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
//   DATABASE_NAME: process.env.DATABASE_NAME,
// };

// import dotenv from "dotenv";
// dotenv.config();

export class Configurations {
  private static instance: Configurations;

  public NODE_ENV: string;
  public PORT: number;
  public DATABASE_URL: string | undefined;
  public DATABASE_HOST: string | undefined;
  public DATABASE_PORT: string | undefined;
  public DATABASE_USERNAME: string | undefined;
  public DATABASE_PASSWORD: string | undefined;
  public DATABASE_NAME: string | undefined;

  private constructor() {
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.PORT = Number(process.env.PORT);
    this.DATABASE_URL = process.env.DATABASE_URL || "fallback_database_url";
    this.DATABASE_PORT = process.env.DATABASE_PORT;
    this.DATABASE_HOST = process.env.DATABASE_HOST;
    this.DATABASE_USERNAME = process.env.DATABASE_USERNAME;
    this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
    this.DATABASE_NAME = process.env.DATABASE_NAME;
  }

  public static getInstance(): Configurations {
    if (!Configurations.instance) {
      Configurations.instance = new Configurations();
    }
    return Configurations.instance;
  }
}

export const Config = Configurations.getInstance();
