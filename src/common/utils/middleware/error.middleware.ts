import { NextFunction, Request, Response } from "express";
import {
  DatabaseException,
  translateToStatusCode,
} from "../../exceptions/db.exception";
import { HttpException } from "../../exceptions/http.exception";
import {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_NOT_FOUND,
} from "../constants";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
}

export const exceptionFilter = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof DatabaseException) {
    res.status(translateToStatusCode(error.code)).json({
      success: false,
      message: error.message,
    });
  } else if (error instanceof HttpException) {
    res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
    });
  } else {
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const exceptionEscalator =
  (controller: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (err) {
      next(err);
    }
  };

export const error404 = () => {
  return (_: any, res: Response) => {
    res.status(HTTP_STATUS_NOT_FOUND).json({ message: "Not found" });
  };
};
