export interface PagesQueryParameter {
  search: string;
  keyId?: string | null;
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

export interface SaveDataResponse {
  status: boolean;
  message: string;
  errors: any;
}
