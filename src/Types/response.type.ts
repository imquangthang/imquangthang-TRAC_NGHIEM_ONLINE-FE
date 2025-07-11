export type ResponseType<T = any> = {
  code: number;
  msgNo: string;
  listError: T[];
  data: T;
};
