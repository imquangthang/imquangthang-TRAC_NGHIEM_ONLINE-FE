import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPen,
  faGear,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import TeacherHeader from "../teacherHeader";

// type Question = {
//   question: string;
//   answers: { [key: string]: string };
//   correctAnswer: string;
//   explanation?: string;
// };

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
    {
      question:
        "Lớp nào của Trái Đất có trạng thái lỏng và tạo ra dòng đối lưu gây ra hiện tượng di chuyển các mảng kiến tạo?",
      answers: {
        A: "Vỏ Trái Đất",
        B: "Manti (Manti trên)",
        C: "Nhân ngoài",
        D: "Nhân trong",
      },
      correctAnswer: "C",
      explanation: "Đáp án đúng: C. Nhân ngoài",
    },
  ],
};

const ExamDetail = () => {
  const [exam] = useState(dummyExam);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <!-- Top Header --> */}
      <TeacherHeader />
      {/* <!-- Main Content --> */}
      <main className="p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
        <div className="flex flex-col md:flex-row p-4 gap-4">
          {/* Main Content */}
          <div className="flex-1 space-y-4">
            <p className="mb-5 text-sm text-gray-400">/exams/{exam?.title}</p>
            {exam.questions.map((q, i) => (
              <div
                key={i}
                className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200 flex gap-4 items-start"
              >
                <div style={{ width: "18%" }} className="shrink-0">
                  <h2 className="font-semibold text-base mb-3">
                    Question {i + 1}
                  </h2>
                  <div className="mt-3 text-blue-600 text-xs flex flex-col gap-2">
                    <div className="flex items-center gap-1 hover:underline cursor-pointer">
                      <FontAwesomeIcon icon={faGear} className="text-sm" /> Edit
                      question
                    </div>
                    <div className="flex items-center gap-1 hover:underline cursor-pointer">
                      <FontAwesomeIcon icon={faPen} className="text-sm" /> Edit
                      answer
                    </div>
                    <div className="flex items-center gap-1 hover:underline cursor-pointer">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-sm"
                      />{" "}
                      Edit explanation
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 mb-2 text-base">
                    {q.question}
                  </div>
                  <ul className="mb-3 space-y-1.5">
                    {Object.entries(q.answers).map(([key, value]) => (
                      <li key={key} className="text-sm">
                        {key}. {value}
                      </li>
                    ))}
                  </ul>
                  <div className="text-green-700 font-medium text-sm flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-green-600 text-base"
                    />
                    Correct Answer: {q.correctAnswer}.{" "}
                    {q.answers[q.correctAnswer as keyof typeof q.answers]}
                  </div>
                  {q.explanation && (
                    <div className="mt-3 text-sm text-gray-600 italic">
                      📝 Explanation: {q.explanation}
                    </div>
                  )}
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
                {exam.questions.map((_, i) => (
                  <button
                    key={i}
                    className="border px-3 py-1 rounded text-sm bg-white hover:bg-blue-100"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500">
                Preview
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamDetail;
