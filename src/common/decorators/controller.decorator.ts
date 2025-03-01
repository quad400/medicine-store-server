import express, { Router, RequestHandler, Request, Response, NextFunction } from "express";
import "reflect-metadata";

export const router = Router();

export function Controller(prefix: string): ClassDecorator {
  return (target: any) => {
    const instance = new target();
    Object.getOwnPropertyNames(target.prototype).forEach((methodName) => {
      const routeHandler = target.prototype[methodName] as RequestHandler;
      const routePath = Reflect.getMetadata("route", target.prototype, methodName);
      const method = Reflect.getMetadata("method", target.prototype, methodName) as keyof Router;
      const summary = Reflect.getMetadata("api:summary", target.prototype, methodName);
      const description = Reflect.getMetadata("api:description", target.prototype, methodName);

      console.log(summary, description)
      if (routePath && method) {
        (router[method] as Function).call(router, `${prefix}${routePath}`, routeHandler.bind(instance));

        // Add Swagger documentation dynamically
        (router[method] as Function).call(router, `${prefix}${routePath}`, ((req:Request, res:Response, next:NextFunction) => {
          /**
           * @openapi
           * /${prefix}${routePath}:
           *   ${method}:
           *     summary: ${summary}
           *     description: ${description}
           *     responses:
           *       200:
           *         description: Successful response
           */
          next();
        }))
      }
    });
  };
}
