// export type Question = {
//   question: string;
//   answers: { [key: string]: string };
//   correctAnswer: string;
//   explanation: string;
// };

export type Options = {
  Content: string;
  IsCorrect: boolean;
};

export type Question = {
  Content: string;
  Explain: string;
  Options: Options[];
};
