import * as dotenv from "dotenv"
import { App } from "./app";
import { AppMiddleware } from "./common/utils/middleware/app.middleware";
import listEndpoints from "express-list-endpoints";


const app = new App({
  middleware: new AppMiddleware(),
});

app.listen();
console.table(listEndpoints(app));
