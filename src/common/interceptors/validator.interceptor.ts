import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "class-validator";
import { HTTP_STATUS_UNPROCESSABLE_ENTITY } from "../utils/constants";
import { Service } from "typedi";


@Service()
@Middleware({ type: "after" })
export class ValidationErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, req: Request, res: Response, next: NextFunction) {
    if (
      Array.isArray(error.errors) &&
      error.errors[0] instanceof ValidationError
    ) {
      const messages = error.errors
        .map((err: any) => Object.values(err.constraints || {}))
        .flat();
      return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({
        statusCode: HTTP_STATUS_UNPROCESSABLE_ENTITY,
        success: false,
        errors: messages,
      });
    }

    next(error);
  }
}
