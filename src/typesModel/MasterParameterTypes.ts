export interface PagesQueryParameter {
  search: string;
  limit: number;
  page: number;
  filterWhere: filterWhereParameter[];
  fieldOrder: string[];
  orderDir: "asc" | "desc";
}

export interface filterWhereParameter {
  field: string;
  value: string;
  operator: string;
}

export interface ApiResponsePages<T> {
  statusCode: number;
  message: string;
  count: number;
  countTotal: number;
  data: T[];
}

export interface ApiResponseOne<T> {
  statusCode: number;
  message: string;
  data: T;
}
