import "reflect-metadata";

export function ApiDoc(summary: string, description: string, method: "get" | "post" | "put" | "delete") {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata("api:summary", summary, target, propertyKey);
    Reflect.defineMetadata("api:description", description, target, propertyKey);
    Reflect.defineMetadata("api:method", method, target, propertyKey);
  };
}
