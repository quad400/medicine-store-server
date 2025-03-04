import { NextFunction, Request, Response } from "express";
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, req: Request, res: Response, next: NextFunction) {
    res.status(error.httpCode || 500).json({
      status: false,
      statusCode: error.httpCode,
      message: error.message || "Internal Server Error",
    });
  }
}
