import { useState, useEffect } from "react";
import TeacherHeader from "../teacherHeader";

interface Student {
  id: number;
  name: string;
  answered: number;
  total: number;
  startTime: Date; // Individual start time for each student
}

const LiveRankings = () => {
  const initialStudents: Student[] = [
    {
      id: 1,
      name: "Nguyen Van A",
      answered: 0,
      total: 20,
      startTime: new Date("2025-07-01T10:48:00+07:00"),
    },
    {
      id: 2,
      name: "Tran Thi B",
      answered: 0,
      total: 20,
      startTime: new Date("2025-07-01T10:50:00+07:00"),
    },
    {
      id: 3,
      name: "Le Van C",
      answered: 0,
      total: 20,
      startTime: new Date("2025-07-01T10:51:00+07:00"),
    },
    {
      id: 4,
      name: "Pham Thi D",
      answered: 0,
      total: 20,
      startTime: new Date("2025-07-01T10:52:00+07:00"),
    },
    {
      id: 5,
      name: "Hoang Van E",
      answered: 0,
      total: 20,
      startTime: new Date("2025-07-01T10:53:00+07:00"),
    },
    {
      id: 6,
      name: "Do Thi F",
      answered: 0,
      total: 20,
      startTime: new Date("2025-07-01T10:54:00+07:00"),
    },
    {
      id: 7,
      name: "Trinh Van G",
      answered: 0,
      total: 20,
      startTime: new Date("2025-07-01T10:50:30+07:00"),
    },
    {
      id: 8,
      name: "Nguyen Thi H",
      answered: 0,
      total: 20,
      startTime: new Date("2025-07-01T10:52:30+07:00"),
    },
    {
      id: 9,
      name: "Vu Van I",
      answered: 0,
      total: 20,
      startTime: new Date("2025-07-01T10:54:30+07:00"),
    },
    {
      id: 10,
      name: "Le Thi K",
      answered: 0,
      total: 20,
      startTime: new Date("2025-07-01T10:55:00+07:00"),
    },
  ];
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [activeStudents, setActiveStudents] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setStudents((prev) =>
        prev.map((student) => ({
          ...student,
          answered: Math.min(
            student.answered + Math.floor(Math.random() * 2),
            student.total
          ),
        }))
      );
      setActiveStudents(Math.max(1, Math.floor(Math.random() * 5))); // Simulate active students
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getElapsedTime = (startTime: Date) => {
    const now = new Date();
    const elapsedSeconds = Math.floor(
      (now.getTime() - startTime.getTime()) / 1000
    );
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <!-- Top Header --> */}
      <TeacherHeader />
      {/* <!-- Main Content --> */}
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
                      key={student.id}
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
                        {getElapsedTime(student.startTime)}
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
