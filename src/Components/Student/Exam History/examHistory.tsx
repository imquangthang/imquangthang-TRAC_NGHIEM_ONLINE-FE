import { useState } from "react";
import StudentHeader from "../studentHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface StudentResult {
  id: number;
  name: string;
  score: number;
  answers: string;
  duration: number;
}

interface ExamHistoryStudent {
  id: number;
  title: string;
  score: number;
  startTime: string;
  endTime: string;
}

const ExamHistory = () => {
  const [expandedExam, setExpandedExam] = useState<number | null>(null);
  const navigate = useNavigate();

  const exams: ExamHistoryStudent[] = [
    {
      id: 1,
      title: "Mathematics Midterm 2025",
      score: 85,
      startTime: "2025-03-01 10:00",
      endTime: "2025-03-01 11:00",
    },
    {
      id: 2,
      title: "English Final 2025",
      score: 92,
      startTime: "2025-05-15 08:30",
      endTime: "2025-05-15 09:30",
    },
    {
      id: 3,
      title: "Geography Quiz",
      score: 78,
      startTime: "2025-04-10 13:00",
      endTime: "2025-04-10 13:45",
    },
    {
      id: 4,
      title: "Physics Practice Test",
      score: 67,
      startTime: "2025-03-20 14:00",
      endTime: "2025-03-20 15:00",
    },
    {
      id: 5,
      title: "Chemistry Final 2025",
      score: 88,
      startTime: "2025-06-01 09:00",
      endTime: "2025-06-01 10:30",
    },
    {
      id: 6,
      title: "History Midterm 2025",
      score: 74,
      startTime: "2025-03-22 10:00",
      endTime: "2025-03-22 11:00",
    },
    {
      id: 7,
      title: "Biology Unit Test",
      score: 90,
      startTime: "2025-04-18 08:00",
      endTime: "2025-04-18 08:45",
    },
    {
      id: 8,
      title: "Civic Education",
      score: 81,
      startTime: "2025-05-02 15:00",
      endTime: "2025-05-02 15:30",
    },
    {
      id: 9,
      title: "Computer Science Practical",
      score: 95,
      startTime: "2025-06-12 10:30",
      endTime: "2025-06-12 11:15",
    },
    {
      id: 10,
      title: "Literature Final 2025",
      score: 87,
      startTime: "2025-05-20 09:00",
      endTime: "2025-05-20 10:00",
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <!-- Top Header --> */}
      <StudentHeader />
      {/* <!-- Main Content --> */}
      <main>
        <div className="flex gap-5 p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
          <div className="flex-1">
            <header className="">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                Exam History
              </h1>
            </header>
            <div className="flex flex-col mt-5 border rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <h3 className="text-lg my-2 font-bold text-gray-900 dark:text-white text-center">
                      Le Ba Loc
                    </h3>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 text-left">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            Score
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            Start Time
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            End Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                        {exams.map((exam) => (
                          <tr>
                            <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                              {exam.title}
                            </td>
                            <td className="py-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                              {exam.score}
                            </td>
                            <td className="py-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                              {exam.startTime}
                            </td>
                            <td className="py-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                              {exam.endTime}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col items-end space-y-2 mt-4">
              <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="icon text-gray-700 dark:text-gray-200"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none border-none focus:ring-0 pl-2 pr-2 w-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cordes-accent dark:focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </button>
            </div>

            <div className="flex justify-center items-center gap-2 mt-6">
              <button className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600">
                &lt;
              </button>
              <button className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-700 text-white flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-800">
                1
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamHistory;
