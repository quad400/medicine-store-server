import express, { Router, RequestHandler, Request, Response, NextFunction } from "express";
import "reflect-metadata";

export const router = Router();

export function Controller(prefix: string): ClassDecorator {
  return (target: any) => {
    const instance = new target();
    Object.getOwnPropertyNames(target.prototype).forEach((methodName) => {
      if (methodName === "constructor") return;

      const routePath = Reflect.getMetadata("route", target.prototype, methodName);
      const method: keyof Router = Reflect.getMetadata("method", target.prototype, methodName);
      const middlewares: RequestHandler[] = Reflect.getMetadata("middlewares", target.prototype, methodName) || [];
      const paramTypes = Reflect.getMetadata("design:paramtypes", target.prototype, methodName) || [];

      if (routePath && method) {
        (router[method] as Function).call(router, `${prefix}${routePath}`, ...middlewares, async (req: Request, res: Response, next: NextFunction) => {
          try {
            // Extract parameters from metadata
            const args = paramTypes.map((_: any, index: number) => {
              if (Reflect.hasMetadata(`body:${methodName}:${index}`, target.prototype)) {
                const key = Reflect.getMetadata(`body:${methodName}:${index}`, target.prototype);
                return key ? req.body[key] : req.body;
              }
              if (Reflect.hasMetadata(`params:${methodName}:${index}`, target.prototype)) {
                const key = Reflect.getMetadata(`params:${methodName}:${index}`, target.prototype);
                return key ? req.params[key] : req.params;
              }
              if (Reflect.hasMetadata(`query:${methodName}:${index}`, target.prototype)) {
                const key = Reflect.getMetadata(`query:${methodName}:${index}`, target.prototype);
                return key ? req.query[key] : req.query;
              }
            });

            const result = await target.prototype[methodName].apply(instance, [...args, req, res]);
            if (result !== undefined) res.json(result);
          } catch (error) {
            next(error);
          }
        });
      }
    });
  };
}
