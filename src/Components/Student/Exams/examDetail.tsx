import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import StudentHeader from "../studentHeader";

type Question = {
  question: string;
  answers: { [key: string]: string };
  correctAnswer: string;
  explanation?: string;
};

const dummyExam = {
  title: "15 minutes",
  id: "DT001",
  description: "Geography",
  time: "15 minutes",
  questions: [
    {
      question: "Việt Nam nằm trong khu vực nào sau đây của châu Á?",
      answers: {
        A: "Tây Nam Á",
        B: "Nam Á",
        C: "Đông Nam Á",
        D: "Đông Á",
      },
      correctAnswer: "C",
      explanation: "Đáp án đúng: C. Đông Nam Á",
    },
    {
      question:
        "Trên bản đồ có tỷ lệ 1:100.000, đoạn đường dài 5cm trên bản đồ tương ứng với bao nhiêu km ngoài thực tế?",
      answers: {
        A: "0,5 km",
        B: "5 km",
        C: "50 km",
        D: "500 km",
      },
      correctAnswer: "C",
      explanation:
        "5 cm × 100.000 = 5.000.000 cm = 50.000 m = 50 km → C. 50 km",
    },
    {
      question: "Khu vực nào sau đây có khí hậu nhiệt đới gió mùa điển hình?",
      answers: {
        A: "Tây Âu",
        B: "Bắc Phi",
        C: "Đông Nam Á",
        D: "Đông Bắc Hoa Kỳ",
      },
      correctAnswer: "C",
      explanation: "Đáp án đúng: C. Đông Nam Á",
    },
  ],
};

const ExamDetail = () => {
  const [exam] = useState(dummyExam);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [index: number]: string;
  }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<{
    [index: number]: boolean;
  }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerSelect = (questionIndex: number, answerKey: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerKey,
    }));
  };

  const handleFlagToggle = (questionIndex: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionIndex]: !prev[questionIndex],
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <!-- Top Header --> */}
      <StudentHeader />
      {/* <!-- Main Content --> */}
      <main className="p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
        <div className="flex flex-col md:flex-row p-4 gap-4">
          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {exam.questions.map((q, i) => (
              <div
                key={i}
                className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200 flex gap-4 items-start"
              >
                <div style={{ width: "18%" }} className="shrink-0">
                  <h2 className="font-semibold text-base mb-3">
                    Question {i + 1}
                  </h2>
                  <div className="mt-3 text-gray-500 text-xs flex flex-col gap-2">
                    <div className="flex items-center gap-1">Answer saved</div>
                  </div>
                  <div className="mt-3 text-gray-500 text-xs flex flex-col gap-2">
                    <div className="flex items-center gap-1">Score 1.00</div>
                  </div>
                  <div className="mt-3 text-gray-500 text-xs flex flex-col gap-2">
                    <button
                      onClick={() => handleFlagToggle(i)}
                      className="flex items-center gap-1 hover:text-blue-600"
                    >
                      <FontAwesomeIcon
                        icon={faFlag}
                        className={
                          flaggedQuestions[i] ? "text-red-500" : "text-gray-500"
                        }
                      />
                      {flaggedQuestions[i] ? "Remove Flag" : "Set Flag"}
                    </button>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-gray-900 mb-2 text-base">
                    {q.question}
                  </div>
                  <div className="mb-3 space-y-1.5">
                    {Object.entries(q.answers).map(([key, value]) => (
                      <label
                        key={key}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <input
                          type="radio"
                          name={`question-${i}`}
                          value={key}
                          checked={selectedAnswers[i] === key}
                          onChange={() => handleAnswerSelect(i, key)}
                          className="accent-blue-600"
                          disabled={submitted}
                        />
                        <span>
                          {key}. {value}
                        </span>
                      </label>
                    ))}

                    {submitted && (
                      <div className="mt-2 text-sm">
                        <p
                          className={
                            selectedAnswers[i] === q.correctAnswer
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {selectedAnswers[i] === q.correctAnswer
                            ? "✅ Chính xác!"
                            : `❌ Sai. Đáp án đúng là: ${q.correctAnswer}`}
                        </p>
                        <p className="text-gray-700 italic">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Info */}
          <div className="w-full md:w-1/3 p-4 border rounded-lg shadow-sm bg-white">
            <p>
              <strong>Title:</strong> {exam.title}
            </p>
            <p>
              <strong>ID:</strong> {exam.id}
            </p>
            <p>
              <strong>Description:</strong> {exam.description}
            </p>
            <p>
              <strong>Times:</strong> {exam.time}
            </p>

            {/* List of Questions */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
              <p className="font-medium text-2xl text-blue-600 mb-2 border-b-2 text-center">
                List of questions
              </p>
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((q, i) => (
                  <button
                    key={i}
                    className={`border px-3 py-1 rounded text-sm flex items-center justify-center ${
                      submitted
                        ? selectedAnswers[i] === q.correctAnswer
                          ? "bg-green-100 border-green-500"
                          : selectedAnswers[i]
                          ? "bg-red-100 border-red-500"
                          : "bg-white border-red-500"
                        : selectedAnswers[i]
                        ? "bg-gray-300 border-black"
                        : "bg-white hover:bg-blue-100 border-gray-300"
                    }`}
                  >
                    {flaggedQuestions[i] && (
                      <FontAwesomeIcon
                        icon={faFlag}
                        className="text-red-500 mr-1 text-xs"
                      />
                    )}
                    {i + 1}
                  </button>
                ))}
              </div>

              {!submitted ? (
                <>
                  <button
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
                    onClick={handleSubmit}
                  >
                    Finish Attempt
                  </button>
                  <p className="mt-2 text-sm text-center text-gray-700">
                    Thời gian còn lại: <b>47:02</b>
                  </p>
                </>
              ) : (
                <p className="mt-4 font-semibold text-green-700">
                  You have submitted the exam.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamDetail;
