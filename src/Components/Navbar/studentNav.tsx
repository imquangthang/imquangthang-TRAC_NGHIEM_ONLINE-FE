import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBookOpen,
  faFloppyDisk,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../Assets/logo.png";

const StudentNav = ({ isMenuOpen, toggleMenu }: any) => {
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
        <Link to="/student" className="flex items-center">
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
          <Link to="/student" className="flex items-center">
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

        {/* Exams Link */}
        <li className="mb-5">
          <Link to="/student/exams" onClick={() => isMenuOpen && toggleMenu()}>
            <div
              className={`flex items-center px-3 py-2 rounded-md text-base md:text-lg transition-colors duration-200 ${
                isActive("/student/exams")
                  ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FontAwesomeIcon
                icon={faBookOpen}
                className="h-6 w-6 md:h-7 md:w-7 mx-3 text-gray-700 dark:text-gray-200"
              />
              <span>Exams</span>
            </div>
          </Link>
        </li>

        {/* Leaderboard Link */}
        {/* <li className="mb-5">
          <Link
            to="/student/leaderboard"
            onClick={() => isMenuOpen && toggleMenu()}
          >
            <div
              className={`flex items-center px-3 py-2 rounded-md text-base md:text-lg transition-colors duration-200 ${
                isActive("/student/leaderboard")
                  ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FontAwesomeIcon
                icon={faServer}
                className="h-6 w-6 md:h-7 md:w-7 mx-3 text-gray-700 dark:text-gray-200"
              />
              <span>Leaderboard</span>
            </div>
          </Link>
        </li> */}

        {/* Exam History Link */}
        <li className="mb-5">
          <Link
            to="/student/exam-history"
            onClick={() => isMenuOpen && toggleMenu()}
          >
            <div
              className={`flex items-center px-3 py-2 rounded-md text-base md:text-lg transition-colors duration-200 ${
                isActive("/student/exam-history")
                  ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FontAwesomeIcon
                icon={faFloppyDisk}
                className="h-6 w-6 md:h-7 md:w-7 mx-3 text-gray-700 dark:text-gray-200"
              />
              <span>Exam History</span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default StudentNav;
