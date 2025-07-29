import type { Question } from "./question.type";

export type RegisterRequest = {
  Email: string;
  Username: string;
  Password: string;
};

export type ExamRequest = {
  Title: string;
  Description: string;
  DurationMinutes: number;
  Questions: Question[];
};
