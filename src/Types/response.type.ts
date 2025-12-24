export type ResponseType<T = any> = {
  code: number;
  msgNo: string;
  listError: T[];
  data: T;
};

export type ChartDataResponse = {
  dailyExamCounts: Record<string, number>;
};
