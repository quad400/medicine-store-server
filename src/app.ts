import express, { Application, Express, Router } from "express";
import { Config, Configurations } from "./common/config";
import log from "./common/utils/logger";
import { AppMiddleware } from "./common/utils/middleware/app.middleware";
// import swaggerJSDoc, { Options } from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
import {
  errorHandler,
  exceptionFilter,
} from "./common/utils/middleware/error.middleware";
import { dataSource } from "./common/db/typeorm.config";
import { router } from "./common/decorators/controller.decorator";
import "./apps/products/product.controller";
import swaggerDocs from "./common/utils/documentation";

export class App {
  public app: express.Application;
  public config: Configurations;

  constructor({ middleware }: { middleware: AppMiddleware }) {
    this.app = express();
    this.config = Configurations.getInstance();
    this.databaseConnection();
    this.initializeMiddleware(middleware);
    this.initializeErrorHandler();
    this.initializeSwagger()
    this.initializeRoutes();
  }

  public listen() {
    const server = this.app.listen(this.config.PORT, () => {
      log.info(`====== ENV: ${this.config.NODE_ENV}=========`);
      log.info(`🚀 App listening on the port ${this.config.PORT}`);
    });

    process.on("uncaughtException", (err) => {
      console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
      console.log(err, err.message);
      process.exit(1);
    });

    process.on("unhandledRejection", (err: any) => {
      console.log("UNHANDLED REJECTION! 💥 Shutting down...");
      console.log(err, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  }

  private initializeMiddleware(middleware: AppMiddleware) {
    middleware.init(this.app);
  }

  private initializeErrorHandler() {
    this.app.use(exceptionFilter);
  }

  private initializeRoutes() {
    this.app.use(router);
  }

  private initializeSwagger() {
    // const options = {
    //   swaggerDefinition: {
    //     info: {
    //       title: "Medicine Store Api",
    //       version: "1.0.0",
    //       description:
    //         "Medicine store restfulapi that handles price, prescription of drugs and provisions",
    //     },
    //     host: "localhost:4000",
    //     basePath: "/api/v1",
    //   },
    //   apis:["./src/apps/**/*.controller.ts"]
    // } as Options;

    // const specs = swaggerJSDoc(options);
    // this.app.use("./api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    // log.info("Swagger Docs available at http://localhost:4000/api-docs");

    swaggerDocs(this.app, this.config.PORT)
  }

  private databaseConnection() {
    dataSource
      .initialize()
      .then(() => {
        log.info("Database Connected Successfully");
      })
      .catch((e) => {
        log.error(`Error connecting database, ${e.message}`);
      });
  }
}
