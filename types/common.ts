export interface IMeta {
  limit: number;
  page: number;
  total: number;
  sort?: string;
  sortOrder?: string;
  size?: number;
  search?: string;
}

export interface responseSuccessType {
  data: any;
  meta?: IMeta;
}
export interface responseErrorType {
  statusCode: number;
  message: string;
  errorMessages?: any;
}
