import { App } from "./app";
import { AppMiddleware } from "./common/utils/middleware/app.middleware";


const app = new App({
  middleware: new AppMiddleware(),
});

app.listen();
