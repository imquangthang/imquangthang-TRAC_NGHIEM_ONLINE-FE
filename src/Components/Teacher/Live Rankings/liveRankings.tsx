import { useState, useEffect, useCallback } from "react";
import { ref, onValue, get } from "firebase/database";
import { auth, db } from "../../../Setup/firebase";
import Header from "../../Header/header";
import { useParams } from "react-router-dom";
import type { Student } from "../../../Interface/student.interface";
import type { ExamRequest } from "../../../Types/request.type";
import { getExamDetail } from "../../../Services/examService";

const LiveRankings = () => {
  const { examId } = useParams<{ examId: string }>();
  const [examDetail, setExamDetail] = useState<ExamRequest | null>(null);
  const [_totalQuestions, setTotalQuestions] = useState(0);
  const [students, setStudents] = useState<Student[]>([]);
  const [activeStudents, setActiveStudents] = useState(0);
  const [elapsedTimes, setElapsedTimes] = useState<{
    [userId: string]: string;
  }>({});

  const loadExamData = useCallback(async () => {
    if (!examId) {
      return;
    }
    try {
      const response: any = await getExamDetail(parseInt(examId));

      if (response) {
        const examData: ExamRequest = {
          Id: response.id,
          Title: response.title,
          Description: response.description,
          DurationMinutes: response.durationMinutes,
          StartTime: response.startTime || new Date().toISOString(),
          Questions: (response.questions || []).map((q: any) => ({
            id: q.id,
            content: q.content,
            explain: q.explain,
            options: (q.options || []).map((opt: any) => ({
              id: opt.id,
              content: opt.content,
              isCorrect: opt.isCorrect,
            })),
          })),
        };
        setExamDetail(examData);
        setTotalQuestions(examData.Questions.length);
      }
    } catch (error) {
      console.error("Error loading exam:", error);
    }
  }, [examId]);

  // Load exam data
  useEffect(() => {
    loadExamData();
    console.log("Firebase listener for examId:", auth.currentUser);
  }, [loadExamData]);

  useEffect(() => {
    if (!examId || !examDetail) return;

    const studentsRef = ref(db, `exams/${examId}/students`);
    const unsubscribeStudents = onValue(studentsRef, async (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setStudents([]);
        setActiveStudents(0);
        return;
      }

      // Chuyển object Firebase thành mảng và xử lý tên
      const studentEntries = Object.entries(data);
      const studentList: Student[] = await Promise.all(
        studentEntries.map(async ([userId, studentData]: [string, any]) => {
          // Kiểm tra xem đã có tên trong danh sách hiện tại chưa để đỡ phải fetch lại
          let name =
            students.find((s) => s.userId === userId)?.name || "Unknown";

          if (name === "Unknown") {
            try {
              const nameSnapshot = await get(ref(db, `users/${userId}/name`));
              if (nameSnapshot.exists()) name = nameSnapshot.val().toString();
            } catch (e) {
              console.error(e);
            }
          }

          // Đếm số câu dựa trên key của selectedAnswers (phải khớp với ExamDetail)
          const answered = studentData.selectedAnswers
            ? Object.keys(studentData.selectedAnswers).length
            : 0;

          return {
            userId,
            name,
            answered,
            total: examDetail.Questions.length, // Lấy trực tiếp từ detail
            startTime: studentData.startTime,
            endTime: studentData.endTime,
            submitted: studentData.submitted || false,
          };
        })
      );

      // Sắp xếp: Ai làm nhiều hơn lên trên, bằng nhau thì ai làm trước lên trên
      studentList.sort(
        (a, b) => b.answered - a.answered || a.startTime - b.startTime
      );

      setStudents(studentList);
      setActiveStudents(studentList.filter((s) => !s.submitted).length);
    });

    return () => unsubscribeStudents();
  }, [examId, examDetail]);

  // Format elapsed time
  const formatElapsedTime = (startTime: number, endTime?: number) => {
    const endTimeToUse = endTime || Date.now();
    const elapsedSeconds = Math.floor((endTimeToUse - startTime) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Update elapsed times every second for non-submitted students
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTimes((prev) => {
        const updatedTimes = { ...prev };
        students.forEach((student) => {
          if (!student.submitted) {
            updatedTimes[student.userId] = formatElapsedTime(student.startTime);
          }
        });
        return updatedTimes;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [students]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
        <p className="mb-5 text-sm text-gray-400">
          /Live Rankings/{examDetail?.Title || "Bài Kiểm tra"}
        </p>
        <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-6">
          <header className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6">
            <h1 className="text-2xl font-bold">Live Exam Rankings</h1>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Active Students: {activeStudents}
            </div>
          </header>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <th className="p-3 text-left font-semibold">Rank</th>
                  <th className="p-3 text-left font-semibold">Student</th>
                  <th className="p-3 text-left font-semibold">Answered</th>
                  <th className="p-3 text-left font-semibold">Unanswered</th>
                  <th className="p-3 text-left font-semibold">Progress</th>
                  <th className="p-3 text-left font-semibold">Time Elapsed</th>
                  <th className="p-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => {
                  const unanswered = student.total - student.answered;
                  const progress =
                    student.total > 0
                      ? ((student.answered / student.total) * 100).toFixed(1)
                      : 0;
                  return (
                    <tr
                      key={student.userId}
                      className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{student.name}</td>
                      <td className="p-3">
                        {student.answered}/{student.total}
                      </td>
                      <td className="p-3">{unanswered}</td>
                      <td className="p-3">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs mt-1 block">{progress}%</span>
                      </td>
                      <td className="p-3">
                        {elapsedTimes[student.userId] || "0:00"}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            student.submitted
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {student.submitted ? "Submitted" : "In Progress"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveRankings;
