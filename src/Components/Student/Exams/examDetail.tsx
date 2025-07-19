import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { ref, update, onValue, push, serverTimestamp } from "firebase/database";
import { db } from "../../../Setup/firebase";
import Header from "../../Header/header";

const dummyExam = {
  title: "15 minutes",
  id: "drill",
  description: "Geography",
  timeLimit: 60 * 60, // 60 minutes in seconds
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

const ExamDetail = ({ userId }: { userId: string }) => {
  const [exam] = useState(dummyExam);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [index: number]: string;
  }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<{
    [index: number]: boolean;
  }>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(exam.timeLimit);
  const [startTime, setStartTime] = useState<number | null>(null);
  const selectedAnswersRef = useRef(selectedAnswers);
  const [openModalSubmit, setOpenModalSubmit] = useState(false);

  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  // Load exam state from Realtime Database
  useEffect(() => {
    const examRef = ref(db, `exams/${exam.id}/students/${userId}`);
    onValue(examRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSelectedAnswers(data.selectedAnswers || {});
        setFlaggedQuestions(data.flaggedQuestions || {});
        setSubmitted(data.submitted || false);
        if (data.startTime) {
          const start = data.startTime;
          setStartTime(start);
          const elapsed = Math.floor((Date.now() - start) / 1000);
          const remaining = exam.timeLimit - elapsed;
          setTimeRemaining(remaining > 0 ? remaining : 0);
          if (remaining <= 0 && !data.submitted) {
            handleSubmit(); // Auto-submit if time runs out
          }
        } else {
          // New exam attempt
          const newStartTime = Date.now();
          setStartTime(newStartTime);
          update(examRef, {
            startTime: newStartTime,
            selectedAnswers: {},
            flaggedQuestions: {},
            submitted: false,
          });
        }
      } else {
        // Initialize new exam attempt
        const newStartTime = Date.now();
        setStartTime(newStartTime);
        update(examRef, {
          startTime: newStartTime,
          selectedAnswers: {},
          flaggedQuestions: {},
          submitted: false,
        });
      }
    });
  }, [exam.id, userId, exam.timeLimit]);

  // Timer effect
  useEffect(() => {
    if (submitted || !startTime) return;

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, exam.timeLimit - elapsed);
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        handleSubmit(); // sẽ dùng ref để tránh mất dữ liệu
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, startTime, exam.timeLimit]);

  // Save answers and flags to Realtime Database
  const saveExamState = async (updates: object) => {
    const examRef = ref(db, `exams/${exam.id}/students/${userId}`);
    await update(examRef, updates);
  };

  const handleAnswerSelect = (questionIndex: number, answerKey: string) => {
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev, [questionIndex]: answerKey };
      saveExamState({
        selectedAnswers: newAnswers,
        flaggedQuestions,
        startTime,
        submitted,
      });
      return newAnswers;
    });
  };

  const handleFlagToggle = (questionIndex: number) => {
    setFlaggedQuestions((prev) => {
      const newFlags = { ...prev, [questionIndex]: !prev[questionIndex] };
      saveExamState({
        selectedAnswers,
        flaggedQuestions: newFlags,
        startTime,
        submitted,
      });
      return newFlags;
    });
  };

  const handleSubmit = async () => {
    if (submitted) return;
    setOpenModalSubmit(false);
    setSubmitted(true);

    const answers = selectedAnswersRef.current;
    const currentTime = Date.now(); // Lấy thời gian hiện tại khi nộp bài

    const score = exam.questions.reduce((total, q, i) => {
      return total + (answers[i] === q.correctAnswer ? 1 : 0);
    }, 0);

    try {
      const leaderboardRef = ref(db, `exams/${exam.id}/leaderboard/${userId}`);
      await push(leaderboardRef, {
        score,
        selectedAnswers: answers,
        submittedAt: serverTimestamp(),
      });

      // LƯU ENDTIME KHI NỘP BÀI
      await saveExamState({
        selectedAnswers: answers,
        flaggedQuestions,
        startTime,
        endTime: currentTime, // Lưu thời gian nộp bài
        submitted: true,
      });
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Top Header */}
      <Header />
      {/* Main Content */}
      <main className="p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
        <p className="mb-5 text-sm text-gray-400">/exams/{exam.title}</p>
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
                      disabled={submitted}
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
              <strong>Time Limit:</strong> {exam.timeLimit / 60} minutes
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
                          : "bg-white border-gray-300"
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
                    onClick={() => setOpenModalSubmit(true)}
                  >
                    Finish Attempt
                  </button>
                  <p className="mt-2 text-sm text-center text-gray-700">
                    Thời gian còn lại: <b>{formatTime(timeRemaining)}</b>
                  </p>
                </>
              ) : (
                <p className="mt-4 font-semibold text-green-700">
                  You have submitted the exam.
                </p>
              )}

              {openModalSubmit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-75 transition-opacity duration-300">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 p-6 sm:max-w-lg transform transition-all duration-300">
                    <h2 className="text-xl text-center font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Your test time left
                    </h2>
                    <p className="text-red-500 text-7xl font-bold mb-1 text-center border-b-2 border-gray-200 dark:border-gray-700 pb-3">
                      {formatTime(timeRemaining)}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
                      Are you sure you want to finish the test?
                    </p>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setOpenModalSubmit(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:border-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamDetail;
