import { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ref, update, onValue, serverTimestamp, set } from "firebase/database";
import { db } from "../../../Setup/firebase";
import Header from "../../Header/header";
import { useParams } from "react-router-dom";
import type { ExamRequest } from "../../../Types/request.type";
import { getExamDetail, submitExam } from "../../../Services/examService";
import type { Options, Question } from "../../../Types/question.type";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const ExamDetail = ({ userId }: { userId: string }) => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exam, setExam] = useState<ExamRequest>();
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [questionId: number]: number;
  }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<{
    [questionId: number]: boolean;
  }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState("0");
  const [timeRemaining, setTimeRemaining] = useState<number>();
  const [startTime, setStartTime] = useState<number | null>(null);
  const selectedAnswersRef = useRef(selectedAnswers);
  const [openModalSubmit, setOpenModalSubmit] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);

  const handleClick = (index: number) => {
    const questionElement = document.getElementById(`question-${index + 1}`);
    if (questionElement) {
      questionElement.scrollIntoView({
        behavior: "smooth",
      });
    }
    setClickedIndex(index);
    // Reset animation after it completes (1s)
    setTimeout(() => setClickedIndex(-1), 1000);
  };

  const loadExamData = useCallback(async () => {
    if (!id) {
      setError("Exam ID is missing");
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const response: any = await getExamDetail(parseInt(id));
      console.log(response);

      if (response) {
        const examData: ExamRequest = {
          Id: response.id,
          Title: response.title,
          Description: response.description,
          DurationMinutes: response.durationMinutes,
          StartTime: response.startTime || new Date().toISOString(),
          Questions: (response.questions || []).map((q: any) => ({
            Id: q.id,
            Content: q.content,
            Explain: q.explain,
            Options: (q.options || []).map((opt: any) => ({
              Id: opt.id,
              Content: opt.content,
              IsCorrect: opt.isCorrect,
            })),
          })),
        };
        setExam(examData);
        setTimeRemaining(examData.DurationMinutes * 60);
      } else {
        setError("No exam data found");
      }
    } catch (error) {
      console.error("Error loading exam:", error);
      setError(
        `Failed to load exam: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExamData();
  }, [loadExamData]);

  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  useEffect(() => {
    if (!exam?.Id || submitted) return; // Stop listener if exam not loaded or submitted

    const examRef = ref(db, `exams/${exam.Id}/students/${userId}`);
    const unsubscribe = onValue(examRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSelectedAnswers(data.selectedAnswers || {});
        setFlaggedQuestions(data.flaggedQuestions || {});
        if (data.submitted) {
          setSubmitted(true);
          setTimeRemaining(0);
          setStartTime(data.startTime || null);
          return;
        }
        if (data.startTime) {
          const start = data.startTime;
          setStartTime(start);
          const elapsed = Math.floor((Date.now() - start) / 1000);
          const remaining = exam.DurationMinutes * 60 - elapsed;
          if (remaining <= 0) {
            setTimeRemaining(0);
            handleSubmit();
          } else {
            setTimeRemaining(remaining);
          }
        } else {
          const newStartTime = Date.now();
          setStartTime(newStartTime);
          setTimeRemaining(exam.DurationMinutes * 60);
          update(examRef, {
            startTime: newStartTime,
            selectedAnswers: {},
            flaggedQuestions: {},
            submitted: false,
          });
        }
      } else {
        const newStartTime = Date.now();
        setStartTime(newStartTime);
        setTimeRemaining(exam.DurationMinutes * 60);
        update(examRef, {
          startTime: newStartTime,
          selectedAnswers: {},
          flaggedQuestions: {},
          submitted: false,
        });
      }
    });

    return () => unsubscribe();
  }, [exam?.Id, exam?.DurationMinutes, userId, submitted]);

  useEffect(() => {
    if (submitted || !startTime || !exam?.DurationMinutes) return;

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, exam.DurationMinutes * 60 - elapsed);
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        handleSubmit();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, startTime, exam?.DurationMinutes]);

  const saveExamState = async (updates: object) => {
    const examRef = ref(db, `exams/${exam?.Id}/students/${userId}`);
    try {
      await update(examRef, updates);
    } catch (error) {
      console.error("Error saving exam state:", error);
      throw error;
    }
  };

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev, [questionId]: answerId };

      // Cập nhật REF ngay lập tức để đồng bộ với handleSubmit
      selectedAnswersRef.current = newAnswers;

      // Đẩy lên Firebase để LiveRankings cập nhật Progress Bar ngay lập tức
      saveExamState({
        selectedAnswers: newAnswers,
        flaggedQuestions, // Giữ nguyên các flag
        startTime,
        submitted: false,
      });

      return newAnswers;
    });
  };

  const handleFlagToggle = (questionId: number) => {
    setFlaggedQuestions((prev) => {
      const newFlags = { ...prev, [questionId]: !prev[questionId] };
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
    const currentTime = Date.now();

    // Prepare API payload
    const apiAnswers = Object.entries(answers).map(
      ([questionId, answerId]) => ({
        questionId: parseInt(questionId),
        answerId: parseInt(answerId.toString()),
      })
    );

    try {
      // Call the API using examService
      setIsLoading(true);
      const response: any = await submitExam(exam?.Id!, apiAnswers);
      if (response && response.code === 200) {
        setScore(response.data.Score);
        // Update Firebase leaderboard
        const leaderboardRef = ref(
          db,
          `exams/${exam?.Id}/leaderboard/${userId}`
        );
        await set(leaderboardRef, {
          score,
          selectedAnswers: answers,
          submittedAt: serverTimestamp(),
        });

        // Update Firebase exam state
        await saveExamState({
          selectedAnswers: answers,
          flaggedQuestions,
          startTime,
          endTime: currentTime,
          submitted: true,
        });
      }
      setIsLoading(false);
      toast.success("Exam submitted successfully!");
    } catch (error) {
      console.error("Error submitting exam:", error);
      setSubmitted(false); // Revert state on error to allow retry
      setError(
        `Failed to submit exam: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      {isLoading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading exam data...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg m-4">
          <div className="flex items-center">
            <div className="text-red-600 mr-3">⚠️</div>
            <div>
              <h3 className="text-red-800 font-medium">Error Loading Exam</h3>
              <p className="text-red-700 mt-1">{error}</p>
              <button
                onClick={loadExamData}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
      {!isLoading && !error && (
        <main className="p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
          <p className="mb-5 text-sm text-gray-400">/exams/{exam?.Title}</p>
          <div className="flex flex-col md:flex-row p-4 gap-4">
            <div className="flex-1 space-y-4">
              {exam?.Questions.map((q: Question) => (
                <div
                  key={q.Id}
                  className={`bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200 flex gap-4 items-start ${
                    clickedIndex === q.Id ? "scale-105 bg-red-50" : "scale-100"
                  }`}
                  id={`question-${q.Id! + 1}`}
                >
                  <div style={{ width: "18%" }} className="shrink-0">
                    <h2 className="font-semibold text-base mb-3">
                      Question{" "}
                      {exam.Questions.findIndex(
                        (question) => question.Id === q.Id
                      ) + 1}
                    </h2>
                    <div className="mt-3 text-gray-500 text-xs flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        Answer saved
                      </div>
                      <button
                        onClick={() => handleFlagToggle(q.Id!)}
                        className="flex items-center gap-1 hover:text-blue-600"
                        disabled={submitted}
                      >
                        <FontAwesomeIcon
                          icon={faFlag}
                          className={
                            flaggedQuestions[q.Id!]
                              ? "text-red-500"
                              : "text-gray-500"
                          }
                        />
                        {flaggedQuestions[q.Id!] ? "Remove Flag" : "Set Flag"}
                      </button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 mb-2 text-base">
                      {q.Content}
                    </div>
                    <div className="mb-3 space-y-1.5">
                      {q.Options.map((option: Options) => (
                        <label
                          key={option.Id}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <input
                            type="radio"
                            name={`question-${q.Id}`}
                            value={option.Id}
                            checked={selectedAnswers[q.Id!] === option.Id}
                            onChange={() =>
                              handleAnswerSelect(q.Id!, option.Id!)
                            }
                            className="accent-blue-600"
                            disabled={submitted}
                          />
                          <span>{option.Content}</span>
                        </label>
                      ))}
                      {submitted && (
                        <div className="mt-2 text-sm">
                          <p
                            className={
                              selectedAnswers[q.Id!] ===
                              q.Options.find((opt: Options) => opt.IsCorrect)
                                ?.Id
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {selectedAnswers[q.Id!] ===
                            q.Options.find((opt: Options) => opt.IsCorrect)?.Id
                              ? "✅ Chính xác!"
                              : `❌ Sai. Đáp án đúng là: ${
                                  q.Options.find(
                                    (opt: Options) => opt.IsCorrect
                                  )?.Content
                                }`}
                          </p>
                          {q.Explain && (
                            <p className="text-gray-700 italic">{q.Explain}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {exam && (
              <>
                <div className="w-full md:w-1/3">
                  <div className="fixed p-4 border rounded-lg shadow-sm bg-white">
                    <p>
                      <strong>Title:</strong> {exam.Title}
                    </p>
                    <p>
                      <strong>Id:</strong> {exam.Id}
                    </p>
                    <p>
                      <strong>Description:</strong> {exam.Description}
                    </p>
                    <p>
                      <strong>Time Limit:</strong> {exam.DurationMinutes}{" "}
                      minutes
                    </p>
                    {submitted && (
                      <>
                        <p className="font-medium text-xl text-red-600 mb-2 border-b-2">
                          <strong>Score:</strong> {score} points
                        </p>
                      </>
                    )}
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
                      <p className="font-medium text-2xl text-blue-600 mb-2 border-b-2 text-center">
                        List of Questions ({exam.Questions.length})
                      </p>
                      <div className="grid grid-cols-5 gap-2">
                        {exam.Questions.map((q) => (
                          <button
                            key={q.Id}
                            className={`border px-0 py-1 rounded text-sm flex items-center justify-center ${
                              submitted
                                ? selectedAnswers[q.Id!] ===
                                  q.Options.find((opt) => opt.IsCorrect)?.Id
                                  ? "bg-green-100 border-green-500"
                                  : selectedAnswers[q.Id!]
                                  ? "bg-red-100 border-red-500"
                                  : "bg-white border-gray-300"
                                : selectedAnswers[q.Id!]
                                ? "bg-gray-300 border-black"
                                : "bg-white hover:bg-blue-100 border-gray-300"
                            }`}
                            onClick={() => {
                              handleClick(q.Id!);
                            }}
                          >
                            {flaggedQuestions[q.Id!] && (
                              <FontAwesomeIcon
                                icon={faFlag}
                                className="text-red-500 mr-1 text-xs"
                              />
                            )}
                            {exam.Questions.findIndex(
                              (question) => question.Id === q.Id
                            ) + 1}
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
                            Thời gian còn lại:{" "}
                            <b>{formatTime(timeRemaining!)}</b>
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
              </>
            )}
          </div>
          {openModalSubmit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-75 transition-opacity duration-300">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 p-6 sm:max-w-lg transform transition-all duration-300">
                <h2 className="text-xl text-center font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Your test time left
                </h2>
                <p className="text-red-500 text-7xl font-bold mb-1 text-center border-b-2 border-gray-200 dark:border-gray-700 pb-3">
                  {formatTime(timeRemaining!)}
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
        </main>
      )}
    </div>
  );
};

export default ExamDetail;
