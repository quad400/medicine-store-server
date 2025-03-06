import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { useContainer, useExpressServer } from "routing-controllers";

import { Configurations } from "./common/config";
import { AppMiddleware } from "./common/utils/middleware/app.middleware";
import log from "./common/utils/logger";
import { dataSource } from "./common/db/typeorm.config";
import "./apps/product/product.controller";
import { CustomErrorHandler } from "./common/exceptions/http.exception";
import { ProductController } from "./apps/product/product.controller";
import { ValidationErrorHandler } from "./common/interceptors/validator.interceptor";
import { Container } from "typedi";
import { DataSource, TreeRepository } from "typeorm";
import { CategoryController } from "./apps/category/category.controller";


export class App {
  public app: express.Application;
  public config: Configurations;

  constructor({ middleware }: { middleware: AppMiddleware }) {
    this.app = express();
    this.config = Configurations.getInstance();
    this.databaseConnection();
    this.initializeModels()
    this.initializeMiddleware(middleware);
    this.initializeSwagger();
    this.initializeRoutes();
  }

  public listen() {
    const server = this.app.listen(this.config.PORT, () => {
      log.info(`====== ENV: ${this.config.NODE_ENV} =========`);
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

  private initializeRoutes() {
    useExpressServer(this.app, {
      routePrefix: "/api/v1",
      controllers: [CategoryController, ProductController],
      middlewares: [AppMiddleware, ValidationErrorHandler, CustomErrorHandler],
      defaultErrorHandler: false,
    });
  }

  private initializeModels(){
  }
  
  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: "Medicine Store API",
          version: "1.0.0",
          description: "Handles drug pricing, prescription, and provisions",
        },
        host: "localhost:4000",
        basePath: "/api/v1",
      },
      apis: ["swagger.yaml"],
    };
    const specs = swaggerJSDoc(options);
    this.app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    log.info("Swagger Docs available at http://localhost:4000/api/v1/api-docs");
  }
  
  private databaseConnection() {

    useContainer(Container)
    dataSource
      .initialize()
      .then(() => {
        log.info("Database Connected Successfully");
        Container.set(DataSource, dataSource);
      })
      .catch((e) => log.error(`Error connecting database, ${e.message}`));
  }
}
