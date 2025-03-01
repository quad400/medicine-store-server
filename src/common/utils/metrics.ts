import client from "prom-client";
import express, { Request, Express, Response } from "express";
import log from "./logger";

const app: Express = express();
export const apiResponsePlot = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "Rest Api response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: "db_response_time_duration_seconds",
  help: "Database response time in seconds",
  labelNames: ["operation", "success"],
});

export function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get("/metrics", async (req: Request, res: Response) => {
    res.set("Content-Type", client.register.contentType);

    res.send(await client.register.metrics());
  });
  app.listen(9100, () => {
    log.info("Metrics server started at http://localhost:9100");
  });
}
