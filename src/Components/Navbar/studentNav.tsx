const StudentNav = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <a href="/dashboard" className="text-white hover:text-gray-300">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/assignments" className="text-white hover:text-gray-300">
            Assignments
          </a>
        </li>
        <li>
          <a href="/grades" className="text-white hover:text-gray-300">
            Grades
          </a>
        </li>
        <li>
          <a href="/profile" className="text-white hover:text-gray-300">
            Profile
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default StudentNav;
