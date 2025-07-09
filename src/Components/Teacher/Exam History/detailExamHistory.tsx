import { useEffect, useState } from "react";
import TeacherHeader from "../teacherHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface StudentResult {
  id: number;
  name: string;
  score: number;
  answers: string;
  duration: number;
}

interface Exam {
  id: number;
  title: string;
  date: string;
  students: StudentResult[];
}

const DetailExamHistory = () => {
  const navigate = useNavigate();
  const [expandedExam, setExpandedExam] = useState<number | null>(null);
  const location = useLocation();
  const [DetailExam, setDetailExam] = useState<Exam | null>(
    location.state?.exam || null
  );

  useEffect(() => {
    if (!DetailExam) {
      toast.error("No exam data found in state");
      return;
    }

    if (!DetailExam.students || DetailExam.students.length === 0) {
      toast.error("No students found in exam data");
      return;
    }

    // Create a new array and sort it
    const sortedStudents = [...DetailExam.students].sort(
      (a: StudentResult, b: StudentResult) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.duration - b.duration;
      }
    );
    setDetailExam((prev) =>
      prev ? { ...prev, students: sortedStudents } : prev
    );
  }, []);
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <!-- Top Header --> */}
      <TeacherHeader />
      {/* <!-- Main Content --> */}
      <main>
        <div className="flex gap-5 p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
          <div className="flex-1">
            <p className="mb-5 text-sm text-gray-400">
              /exams/{DetailExam?.title}
            </p>
            <header className="">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                {DetailExam ? DetailExam.title : "Exam Details"}
              </h1>
            </header>
            <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-6">
              <div className="space-y-4">
                {DetailExam?.students.map((student: StudentResult) => (
                  <div className="flex gap-2" key={student.id}>
                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                      <div className="w-full text-left p-4 font-semibold text-lg flex justify-between items-center transition-colors">
                        <span>{student.name}</span>
                        <span>{student.score}</span>
                      </div>
                    </div>
                    <div className="inline-block">
                      <button
                        onClick={() =>
                          navigate(
                            `/teacher/exam-history/${DetailExam.id}/student/${student.id}`,
                            {
                              state: { student },
                            }
                          )
                        }
                        className="w-full text-left p-4 font-semibold text-lg flex justify-between items-center bg-blue-300 hover:bg-blue-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors border-gray-200 rounded-lg shadow-md border"
                      >
                        <span>View Detail</span>
                      </button>
                    </div>
                  </div>
                ))}
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

export default DetailExamHistory;
