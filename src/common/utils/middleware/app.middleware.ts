import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Config } from "../../config";

export class AppMiddleware {
  init(app: Application) {
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "trusted-scripts.com"],
          },
        },
        xssFilter: true,
        frameguard: { action: "deny" },
      })
    );
    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    if (Config.NODE_ENV === "development") {
      app.use(morgan("dev"));
    }
    app.use(express.json({ limit: "10kb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "Too many request from this IP, please try again in an hour",
      })
    );
  }
}
