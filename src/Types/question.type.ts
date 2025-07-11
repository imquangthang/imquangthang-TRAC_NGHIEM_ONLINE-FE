export type Question = {
  question: string;
  answers: { [key: string]: string };
  correctAnswer: string;
  explanation: string;
};
