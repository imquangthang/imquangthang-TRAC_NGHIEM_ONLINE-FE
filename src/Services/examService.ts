import instance from "../Setup/axios.ts";
import type { ExamRequest } from "../Types/request.type.ts";

const addNewExam = (data: ExamRequest) => {
  const formData = new FormData();

  formData.append("Title", data.Title);
  formData.append("Description", data.Description);
  formData.append("DurationMinutes", data.DurationMinutes.toString());

  data.Questions.forEach((q, i) => {
    formData.append(`Questions[${i}].Content`, q.Content);
    formData.append(`Questions[${i}].Explain`, q.Explain);

    q.Options.forEach((opt, j) => {
      formData.append(`Questions[${i}].Options[${j}].Content`, opt.Content);
      formData.append(
        `Questions[${i}].Options[${j}].IsCorrect`,
        opt.IsCorrect.toString()
      );
    });
  });

  return instance.post("/api/exam", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const fetchAllExams = (
  Title: string,
  CurrentPage: number,
  PageSize: number
) => {
  return instance.get("/api/exam", {
    params: {
      Keyword: Title,
      CurrentPage: CurrentPage,
      PageSize: PageSize,
    },
  });
};

export { addNewExam, fetchAllExams };
