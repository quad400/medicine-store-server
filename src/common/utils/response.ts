export class Response<T> {
  public success: boolean;
  constructor(
    public status: boolean,
    public statusCode: number,
    public message: string,
    public data?: T
  ) {}
}
