export type Options = {
  Id?: number;
  Content: string;
  IsCorrect: boolean;
};

export type Question = {
  Id?: number;
  Content: string;
  Explain: string;
  Options: Options[];
};
