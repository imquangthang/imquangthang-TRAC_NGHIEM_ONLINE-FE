import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../../Setup/firebase"; // Ensure firebase.ts exports Realtime Database
import Header from "../../Header/header";

interface Student {
  userId: string;
  name: string; // Fetched from user profile or fallback to userId
  answered: number;
  total: number;
  startTime: number; // Unix timestamp from Realtime Database
  submitted: boolean;
}

const examId = "drill"; // Matches ExamDetail's exam.id
const totalQuestions = 3; // From dummyExam.questions.length in ExamDetail

const LiveRankings = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [activeStudents, setActiveStudents] = useState(0);
  const [elapsedTimes, setElapsedTimes] = useState<{
    [userId: string]: string;
  }>({});

  // Format elapsed time
  const formatElapsedTime = (startTime: number) => {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - startTime) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Load student data from Realtime Database
  useEffect(() => {
    const studentsRef = ref(db, `exams/${examId}/students`);
    const unsubscribeStudents = onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setStudents([]);
        setActiveStudents(0);
        setElapsedTimes({});
        return;
      }

      const studentList: Student[] = Object.entries(data).map(
        ([userId, studentData]: [string, any]) => {
          const answered = studentData.selectedAnswers
            ? Object.keys(studentData.selectedAnswers).length
            : 0;
          return {
            userId,
            name: studentData.name || userId, // Fallback to userId if name not available
            answered,
            total: totalQuestions,
            startTime: studentData.startTime || Date.now(),
            submitted: studentData.submitted || false,
          };
        }
      );

      // Sort by answered questions (descending) and startTime (ascending)
      studentList.sort((a, b) => {
        if (a.answered !== b.answered) {
          return b.answered - a.answered;
        }
        return a.startTime - b.startTime;
      });

      // Initialize elapsed times
      const initialElapsedTimes = studentList.reduce((acc, student) => {
        acc[student.userId] = formatElapsedTime(student.startTime);
        return acc;
      }, {} as { [userId: string]: string });

      setStudents(studentList);
      setActiveStudents(studentList.filter((s) => !s.submitted).length);
      setElapsedTimes(initialElapsedTimes);
    });

    // Cleanup listener on unmount
    return () => unsubscribeStudents();
  }, []);

  // Update elapsed times every second
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTimes((prev) => {
        const updatedTimes = { ...prev };
        students.forEach((student) => {
          if (!student.submitted) {
            // Only update time for students who haven't submitted
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
      {/* Top Header */}
      <Header />
      {/* Main Content */}
      <main className="p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
        <p className="mb-5 text-sm text-gray-400">/exams/Live Exam Rankings</p>
        <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-6">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6">
            <h1 className="text-2xl font-bold">Live Exam Rankings</h1>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Active Students: {activeStudents}
            </div>
          </header>

          {/* Ranking Table */}
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
                  const progress = (
                    (student.answered / student.total) *
                    100
                  ).toFixed(1);
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
                        {student.submitted ? "Submitted" : "In Progress"}
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
