import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../Header/header";

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

const exams: Exam[] = [
  {
    id: 1,
    title: "Mathematics Midterm 2025",
    date: "2025-06-15",
    students: [
      {
        id: 1,
        name: "Nguyen Van A",
        score: 85,
        answers: "A,B,C,D",
        duration: 290,
      },
      {
        id: 2,
        name: "Tran Thi B",
        score: 92,
        answers: "B,C,D,A",
        duration: 310,
      },
      {
        id: 3,
        name: "Le Van C",
        score: 0,
        answers: "A,B,B,D",
        duration: 280,
      },
      {
        id: 4,
        name: "Pham Thi D",
        score: 100,
        answers: "C,C,C,C",
        duration: 300,
      },
      {
        id: 5,
        name: "Hoang Van E",
        score: 88,
        answers: "C,A,D,B",
        duration: 320,
      },
    ],
  },
  {
    id: 2,
    title: "Science Final 2025",
    date: "2025-06-20",
    students: [
      {
        id: 6,
        name: "Do Thi F",
        score: 90,
        answers: "A,B,C,D",
        duration: 285,
      },
      {
        id: 7,
        name: "Trinh Van G",
        score: 85,
        answers: "B,C,D,A",
        duration: 305,
      },
      {
        id: 8,
        name: "Nguyen Thi H",
        score: 87,
        answers: "A,C,B,D",
        duration: 295,
      },
      {
        id: 9,
        name: "Vu Van I",
        score: 93,
        answers: "B,D,A,C",
        duration: 315,
      },
      {
        id: 10,
        name: "Le Thi K",
        score: 89,
        answers: "C,A,D,B",
        duration: 300,
      },
    ],
  },
  {
    id: 3,
    title: "History Quiz 2025",
    date: "2025-06-25",
    students: [
      {
        id: 11,
        name: "Nguyen Van L",
        score: 82,
        answers: "A,B,C,D",
        duration: 290,
      },
      {
        id: 12,
        name: "Tran Thi M",
        score: 88,
        answers: "B,C,D,A",
        duration: 310,
      },
      {
        id: 13,
        name: "Le Van N",
        score: 90,
        answers: "A,C,B,D",
        duration: 280,
      },
      {
        id: 14,
        name: "Pham Thi O",
        score: 85,
        answers: "B,D,A,C",
        duration: 300,
      },
      {
        id: 15,
        name: "Hoang Van P",
        score: 91,
        answers: "C,A,D,B",
        duration: 320,
      },
    ],
  },
  {
    id: 4,
    title: "Mathematics Midterm 2025",
    date: "2025-06-15",
    students: [
      {
        id: 1,
        name: "Nguyen Van A",
        score: 85,
        answers: "A,B,C,D",
        duration: 290,
      },
      {
        id: 2,
        name: "Tran Thi B",
        score: 92,
        answers: "B,C,D,A",
        duration: 310,
      },
      {
        id: 3,
        name: "Le Van C",
        score: 78,
        answers: "A,C,B,D",
        duration: 280,
      },
      {
        id: 4,
        name: "Pham Thi D",
        score: 95,
        answers: "B,D,A,C",
        duration: 300,
      },
      {
        id: 5,
        name: "Hoang Van E",
        score: 88,
        answers: "C,A,D,B",
        duration: 320,
      },
    ],
  },
  {
    id: 5,
    title: "Science Final 2025",
    date: "2025-06-20",
    students: [
      {
        id: 6,
        name: "Do Thi F",
        score: 90,
        answers: "A,B,C,D",
        duration: 285,
      },
      {
        id: 7,
        name: "Trinh Van G",
        score: 85,
        answers: "B,C,D,A",
        duration: 305,
      },
      {
        id: 8,
        name: "Nguyen Thi H",
        score: 87,
        answers: "A,C,B,D",
        duration: 295,
      },
      {
        id: 9,
        name: "Vu Van I",
        score: 93,
        answers: "B,D,A,C",
        duration: 315,
      },
      {
        id: 10,
        name: "Le Thi K",
        score: 89,
        answers: "C,A,D,B",
        duration: 300,
      },
    ],
  },
  {
    id: 6,
    title: "History Quiz 2025",
    date: "2025-06-25",
    students: [
      {
        id: 11,
        name: "Nguyen Van L",
        score: 82,
        answers: "A,B,C,D",
        duration: 290,
      },
      {
        id: 12,
        name: "Tran Thi M",
        score: 88,
        answers: "B,C,D,A",
        duration: 310,
      },
      {
        id: 13,
        name: "Le Van N",
        score: 90,
        answers: "A,C,B,D",
        duration: 280,
      },
      {
        id: 14,
        name: "Pham Thi O",
        score: 85,
        answers: "B,D,A,C",
        duration: 300,
      },
      {
        id: 15,
        name: "Hoang Van P",
        score: 91,
        answers: "C,A,D,B",
        duration: 320,
      },
    ],
  },
  {
    id: 7,
    title: "Mathematics Midterm 2025",
    date: "2025-06-15",
    students: [
      {
        id: 1,
        name: "Nguyen Van A",
        score: 85,
        answers: "A,B,C,D",
        duration: 290,
      },
      {
        id: 2,
        name: "Tran Thi B",
        score: 92,
        answers: "B,C,D,A",
        duration: 310,
      },
      {
        id: 3,
        name: "Le Van C",
        score: 78,
        answers: "A,C,B,D",
        duration: 280,
      },
      {
        id: 4,
        name: "Pham Thi D",
        score: 95,
        answers: "B,D,A,C",
        duration: 300,
      },
      {
        id: 5,
        name: "Hoang Van E",
        score: 88,
        answers: "C,A,D,B",
        duration: 320,
      },
    ],
  },
  {
    id: 8,
    title: "Science Final 2025",
    date: "2025-06-20",
    students: [
      {
        id: 6,
        name: "Do Thi F",
        score: 90,
        answers: "A,B,C,D",
        duration: 285,
      },
      {
        id: 7,
        name: "Trinh Van G",
        score: 85,
        answers: "B,C,D,A",
        duration: 305,
      },
      {
        id: 8,
        name: "Nguyen Thi H",
        score: 87,
        answers: "A,C,B,D",
        duration: 295,
      },
      {
        id: 9,
        name: "Vu Van I",
        score: 93,
        answers: "B,D,A,C",
        duration: 315,
      },
      {
        id: 10,
        name: "Le Thi K",
        score: 89,
        answers: "C,A,D,B",
        duration: 300,
      },
    ],
  },
  {
    id: 9,
    title: "History Quiz 2025",
    date: "2025-06-25",
    students: [
      {
        id: 11,
        name: "Nguyen Van L",
        score: 82,
        answers: "A,B,C,D",
        duration: 290,
      },
      {
        id: 12,
        name: "Tran Thi M",
        score: 88,
        answers: "B,C,D,A",
        duration: 310,
      },
      {
        id: 13,
        name: "Le Van N",
        score: 90,
        answers: "A,C,B,D",
        duration: 280,
      },
      {
        id: 14,
        name: "Pham Thi O",
        score: 85,
        answers: "B,D,A,C",
        duration: 300,
      },
      {
        id: 15,
        name: "Hoang Van P",
        score: 91,
        answers: "C,A,D,B",
        duration: 320,
      },
    ],
  },
];

const LeaderboardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [DetailExam, setDetailExam] = useState<Exam | null>(
    exams.find((exam) => exam.id === parseInt(id || "0")) || null
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
      <Header />
      {/* <!-- Main Content --> */}
      <main>
        <div className="flex gap-5 p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
          <div className="flex-1">
            <p className="mb-5 text-sm text-gray-400">
              /leaderboard/{DetailExam?.title}
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
                  className="outline-none border-none pl-2 pr-2 w-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cordes-accent dark:focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
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

export default LeaderboardDetail;
