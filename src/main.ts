import "reflect-metadata";
import { App } from "./app";
import { AppMiddleware } from "./common/utils/middleware/app.middleware";
import { useContainer } from "routing-controllers";
import { Container } from "typedi";
import { useContainer as ormUseContainer } from "typeorm";


const app = new App({
  middleware: new AppMiddleware(),
});
useContainer(Container)
// ormUseContainer(Container)
app.listen();
