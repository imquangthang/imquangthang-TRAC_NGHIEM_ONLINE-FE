import { Link, useLocation } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faClipboard,
  faFile,
  faFloppyDisk,
  faServer,
} from "@fortawesome/free-solid-svg-icons";

const TeacherNav = () => {
  const location = useLocation();

  const isActive = (path: any) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-800 p-4 border rounded border-gray-200 dark:border-gray-700 shadow-md fixed top-0 left-0 h-screen">
      <ul className="space-x-4">
        <li className="mb-10">
          <Link
            to="/teacher"
            className="flex items-center px-3 py-2 rounded-md"
          >
            <div>
              <img src={Logo} alt="Logo" className="mx-auto h-20 w-auto" />
            </div>
            <div>
              <p className="text-center text-sm/6 text-gray-500 dark:text-gray-300 font-overlock border-b-2 border-gray-300 dark:border-gray-600">
                <b>ONLINE QUIZ</b>
              </p>
              <p className="text-center text-sm/6 text-gray-500 dark:text-gray-300">
                Quick Test – Accurate Results!
              </p>
            </div>
          </Link>
        </li>

        <li className="mb-5">
          <Link to="/teacher/exams">
            <div
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/teacher/exams")
                  ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FontAwesomeIcon
                icon={faBookOpen}
                className="icon h-7 w-7 mx-3 text-gray-700 dark:text-gray-200"
              />
              <p className="text-sm text-xl">Exams</p>
            </div>
          </Link>
        </li>

        <li className="mb-5">
          <Link to="/teacher/questions">
            <div
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/teacher/questions")
                  ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FontAwesomeIcon
                icon={faClipboard}
                className="icon h-7 w-7 mx-3 text-gray-700 dark:text-gray-200"
              />
              <p className="text-sm text-xl">Questions</p>
            </div>
          </Link>
        </li>

        <li className="mb-5">
          <Link to="/teacher/leader-board">
            <div
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/teacher/leader-board")
                  ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FontAwesomeIcon
                icon={faServer}
                className="icon h-7 w-7 mx-3 text-gray-700 dark:text-gray-200"
              />
              <p className="text-sm text-xl">Leaderboard</p>
            </div>
          </Link>
        </li>

        <li className="mb-5">
          <Link to="/teacher/exam-history">
            <div
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/teacher/exam-history")
                  ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FontAwesomeIcon
                icon={faFloppyDisk}
                className="icon h-7 w-7 mx-3 text-gray-700 dark:text-gray-200"
              />
              <p className="text-sm text-xl">Exam History</p>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default TeacherNav;
