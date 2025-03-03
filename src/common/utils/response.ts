import { Response as ExpressResponse } from "express";
import { HttpException } from "../exceptions/http.exception";
import { DatabaseException, ExceptionCodes } from "../exceptions/db.exception";

export class AppResponse<T> {
  static success<T>({
    res,
    status_code,
    data,
    message,
  }: {
    res: ExpressResponse;
    status_code: number;
    message?: string;
    data?: T;
  }) {
    return res.status(status_code).json({
      status_code: status_code,
      message: message,
      data: data,
    });
  }

  static serverError({
    message,
    status_code,
  }: {
    status_code: number;
    message: string;
  }) {
    throw new HttpException(status_code, message);
  }

  static dbError({
    message,
    status_code,
  }: {
    status_code: ExceptionCodes;
    message: string;
  }) {
    throw new DatabaseException(status_code, message);
  }
}
