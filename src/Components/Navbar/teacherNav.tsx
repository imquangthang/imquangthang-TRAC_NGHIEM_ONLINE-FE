import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBookOpen,
  faClipboard,
  faFloppyDisk,
  faRankingStar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../Assets/logo.png";

const TeacherNav = ({ isMenuOpen, toggleMenu }: any) => {
  // Placeholder isActive function (replace with your actual implementation)
  const isActive = (path: any) => window.location.pathname === path;

  return (
    <nav
      className={`bg-white dark:bg-gray-800 border rounded border-gray-200 dark:border-gray-700 shadow-md fixed top-0 left-0 h-screen w-64 md:w-72 lg:w-80 transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
    >
      {/* Hamburger Menu Button for Mobile */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <Link to="/teacher" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
        </Link>
        <button
          onClick={toggleMenu}
          className="text-gray-700 dark:text-gray-200 focus:outline-none"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            className="h-6 w-6"
          />
        </button>
      </div>

      {/* Navigation Menu */}
      <ul
        className={`space-y-4 p-4 md:p-6 h-full overflow-y-auto transition-all duration-300`}
      >
        {/* Logo and Branding (Hidden on Mobile when Menu is Closed) */}
        <li className="mb-10 hidden md:flex md:flex-col items-center">
          <Link to="/teacher" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-20 w-auto mx-auto" />
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-300 font-overlock border-b-2 border-gray-300 dark:border-gray-600">
                <b>ONLINE QUIZ</b>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
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
              <p className="text-xl">Exams</p>
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
              <p className="text-xl">Questions</p>
            </div>
          </Link>
        </li>

        <li className="mb-5">
          <Link to="/teacher/live-rankings">
            <div
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/teacher/live-rankings") ||
                window.location.pathname.startsWith("/teacher/live-rankings/")
                  ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FontAwesomeIcon
                icon={faRankingStar}
                className="icon h-7 w-7 mx-3 text-gray-700 dark:text-gray-200"
              />
              <p className="text-xl">Live Rankings</p>
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
              <p className="text-xl">Exam History</p>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TeacherNav;
