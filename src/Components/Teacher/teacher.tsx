import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/header";

const Teacher: React.FC = () => {
  const listExams = [
    {
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
    {
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
    {
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
    {
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
    {
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
  ];
  return (
    <>
      <Header />

      <main>
        <div className="flex gap-5 p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
          <div>
            <div className="font-bold text-5xl text-center mb-10 text-gray-900 dark:text-white">
              List Of Exams
            </div>
            {listExams && listExams.length > 0 ? (
              <>
                <div className="w-full flex flex-col items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* 3 cards đầu tiên */}
                    {listExams.slice(0, 3).map((exam, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 flex flex-col gap-5 rounded-xl shadow p-4 border border-gray-300 dark:border-gray-600"
                      >
                        <p className="text-gray-900 dark:text-gray-200">
                          <b>Title: </b>
                          {exam.title}
                        </p>
                        <p className="text-gray-900 dark:text-gray-200">
                          <b>Description:</b> {exam.description}
                        </p>
                        <p className="text-gray-900 dark:text-gray-200">
                          <b>Duration_minutes:</b> {exam.durationMinutes}
                        </p>
                        <p className="text-gray-900 dark:text-gray-200">
                          <b>Created_by:</b> {exam.created_by}
                        </p>
                        <div className="flex justify-center">
                          <button className="mt-4 bg-blue-400 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 dark:hover:bg-blue-700">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 2 cards dưới, căn giữa bằng flex */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:mx-32">
                    {listExams.slice(3, 5).map((exam, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 flex flex-col gap-5 rounded-xl shadow p-4 border border-gray-300 dark:border-gray-600"
                      >
                        <p className="text-gray-900 dark:text-gray-200">
                          <b>Title: </b>
                          {exam.title}
                        </p>
                        <p className="text-gray-900 dark:text-gray-200">
                          <b>Description:</b> {exam.description}
                        </p>
                        <p className="text-gray-900 dark:text-gray-200">
                          <b>Duration_minutes:</b> {exam.durationMinutes}
                        </p>
                        <p className="text-gray-900 dark:text-gray-200">
                          <b>Created_by:</b> {exam.created_by}
                        </p>
                        <div className="flex justify-center">
                          <button className="mt-4 bg-blue-400 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 dark:hover:bg-blue-700">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full mt-4 text-right pr-4">
                    <a
                      href="teacher/exams"
                      className="text-blue-500 dark:text-blue-400 hover:underline dark:hover:text-blue-300"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Không có bài kiểm tra nào.
              </p>
            )}
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

              <button className="flex items-center w-full gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="icon text-gray-700 dark:text-gray-200"
                />
                <span className="text-sm text-gray-900 dark:text-gray-200">
                  Insert Exam
                </span>
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
    </>
  );
};
export default Teacher;
