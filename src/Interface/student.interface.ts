export interface Student {
  userId: string;
  name: string;
  answered: number;
  total: number;
  startTime: number;
  endTime?: number; // Thêm endTime
  submitted: boolean;
}
