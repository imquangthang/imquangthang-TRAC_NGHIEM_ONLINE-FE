import {
  faBell,
  faCircleInfo,
  faCircleUser,
  faMoon,
  faSearch,
  faSignOut,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

const StudentHeader = () => {
  const [darkMode, setDarkMode] = useState(false);

  const changeTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(document.documentElement.classList.contains("dark"));
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  };
  return (
    <header className="shadow-sm border rounded bg-white border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <div className="px-6 py-1">
        <div className="flex items-center justify-between space-x-4">
          <div className="relative w-7/12">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-cordes-blue text-xl absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cordes-accent dark:focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => changeTheme()}
              className="w-10 h-10 mr-3 rounded-full border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FontAwesomeIcon
                icon={darkMode ? faSun : faMoon}
                className="text-cordes-blue dark:text-blue-400 text-xl"
              />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <FontAwesomeIcon
                icon={faBell}
                className="text-cordes-blue dark:text-blue-400 text-xl"
              />
            </button>
          </div>

          <div className="relative">
            <button
              id="dropdownInformationButton"
              data-dropdown-toggle="dropdownInformation"
              className="p-2 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              type="button"
            >
              <div className="text-end">
                Le Ba Loc
                <br />
                Student
              </div>

              <img
                src="https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <svg
                className="w-2.5 h-2.5 ms-3 text-gray-600 dark:text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdownInformation"
              className="z-10 hidden absolute bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-600 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm w-44"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div className="font-medium truncate">Le Ba Loc</div>
                <div className="text-gray-500 dark:text-gray-400">
                  lbloc@gmail.com
                </div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownInformationButton"
              >
                <li className="font-medium block px-4 py-2 hover:cursor-pointer hover:bg-gray-100 text-gray-700 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-200">
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className="text-cordes-blue dark:text-blue-400 text-lg me-2"
                  />
                  Edit Profile
                </li>
                <li className="font-medium block px-4 py-2 hover:cursor-pointer hover:bg-gray-100 text-gray-700 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-200">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="text-cordes-blue dark:text-blue-400 text-lg me-2"
                  />
                  Support
                </li>
              </ul>
              <div className="py-2">
                <Link
                  to="/login"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                  }}
                  className="block px-4 py-2 font-medium text-sm text-gray-700 hover:text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <FontAwesomeIcon
                    icon={faSignOut}
                    className="text-cordes-blue dark:text-blue-400 text-lg me-2"
                  />
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default StudentHeader;
