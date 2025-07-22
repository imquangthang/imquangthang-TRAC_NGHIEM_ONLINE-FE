import { Outlet } from "react-router-dom";
import StudentNav from "../Components/Navbar/studentNav";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const StudentLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex bg-white dark:bg-black min-h-screen">
      {/* Sidebar */}
      <div className="fixed md:static md:w-80 lg:w-80 z-20">
        <StudentNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>

      {/* Content Area */}
      <div className="flex-1 transition-all duration-300 relative z-10">
        <div className="p-4 pt-2">
          {/* Hamburger Button for Mobile (Top Bar) */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none mb-4"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              className="h-6 w-6"
            />
          </button>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
