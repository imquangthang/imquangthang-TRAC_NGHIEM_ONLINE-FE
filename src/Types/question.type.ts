export type Options = {
  Content: string;
  IsCorrect: boolean;
};

export type Question = {
  Content: string;
  Explain: string;
  Options: Options[];
};
