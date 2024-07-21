export interface PaginationResponse<T> {
  totalCount: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
