export class AbstractController<T> {
  response({
    message,
    statusCode,
    data,
  }: {
    statusCode: number;
    message: string;
    data?: T;
  }) {
    return {
      statusCode,
      message,
      data,
    };
  }
}
