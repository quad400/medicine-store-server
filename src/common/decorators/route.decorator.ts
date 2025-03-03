import "reflect-metadata";
import log from "../utils/logger";

const createRouteDecorator =
  (method: string) =>
  (path: string): MethodDecorator => {
    return (target, propertyKey) => {
      Reflect.defineMetadata("route", path, target, propertyKey);
      Reflect.defineMetadata("method", method, target, propertyKey);
    };
  };


export const Get = createRouteDecorator("get");
export const Post = createRouteDecorator("post");
export const Put = createRouteDecorator("put");
export const Delete = createRouteDecorator("delete");
export const Patch = createRouteDecorator("patch");
