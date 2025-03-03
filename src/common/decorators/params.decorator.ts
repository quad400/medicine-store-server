import "reflect-metadata";
import { Request } from "express";

export enum ParamType {
  BODY = "body",
  PARAMS = "params",
  QUERY = "query",
}

function createParamDecorator(paramType: ParamType) {
  return (key?: string): ParameterDecorator => {
    return (target, propertyKey, parameterIndex) => {
      Reflect.defineMetadata(`${paramType}:${String(propertyKey)}:${parameterIndex}`, key, target);
    };
  };
}

export const Body = createParamDecorator(ParamType.BODY);
export const Params = createParamDecorator(ParamType.PARAMS);
export const Query = createParamDecorator(ParamType.QUERY);
