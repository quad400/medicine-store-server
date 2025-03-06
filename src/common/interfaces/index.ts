export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: T[];

  //   constructor(
  //     total: number,
  //     page: number,
  //     limit: number,
  //     totalPages: number,
  //     data: T[]
  //   ) {
  //     total = this.total;
  //     page = this.page;
  //     limit = this.limit;
  //     totalPages = this.totalPages;
  //     data = this.data;
  //   }
}
