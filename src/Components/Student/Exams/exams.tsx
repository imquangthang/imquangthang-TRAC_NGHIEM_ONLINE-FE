import { useNavigate } from "react-router-dom";
import Header from "../../Header/header";

const Exams = () => {
  const navigare = useNavigate();
  const listExams = [
    {
      id: 1,
      title:
        "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description:
        "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
    {
      id: 2,
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
    {
      id: 3,
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
    {
      id: 4,
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
    {
      id: 5,
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
    {
      id: 6,
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
    {
      id: 7,
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
    {
      id: 8,
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
    {
      id: 9,
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
    {
      id: 10,
      title: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      description: "Bài Kiểm tra cuối kì 2 - Lập Trình Hướng Đối Tượng",
      durationMinutes: "50 minutes",
      created_by: "imThang",
    },
  ];
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <!-- Top Header --> */}
      <Header />
      {/* <!-- Main Content --> */}
      <main className="p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="-m-1.5 overflow-x-auto w-11/12">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
                <div className="py-3 px-4">
                  <div className="relative max-w-xs">
                    <label className="sr-only">Search</label>
                    <input
                      type="text"
                      name="hs-table-with-pagination-search"
                      id="hs-table-with-pagination-search"
                      className="py-1.5 sm:py-2 px-3 ps-9 block w-full border border-gray-200 dark:border-gray-600 rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Search for items"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                      <svg
                        className="size-4 text-gray-400 dark:text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <table className="table-fixed min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                        >
                          STT
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                        >
                          Duration Minutes
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                        >
                          Created_by
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-xs font-medium text-gray-500 dark:text-gray-300 uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {listExams && listExams.length > 0 ? (
                        <>
                          {listExams.map((exam, index) => (
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="px-6 py-4  text-sm font-medium text-gray-800 dark:text-white">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4  text-sm font-medium text-gray-800 dark:text-white">
                                <p className="line-clamp-2">{exam.title}</p>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                                <p className="line-clamp-2">
                                  {exam.description}
                                </p>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {exam.durationMinutes}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {exam.created_by}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <button
                                  className="mt-4 px-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
                                  onClick={() => {
                                    navigare(`/student/exam/${index + 1}`);
                                  }}
                                >
                                  Làm Bài
                                </button>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="py-1 px-4">
                  <nav
                    className="flex items-center space-x-1"
                    aria-label="Pagination"
                  >
                    <button
                      type="button"
                      className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">«</span>
                      <span className="sr-only">Previous</span>
                    </button>
                    <button
                      type="button"
                      className="min-w-10 flex justify-center items-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                      aria-current="page"
                    >
                      1
                    </button>
                    <button
                      type="button"
                      className="min-w-10 flex justify-center items-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                    >
                      2
                    </button>
                    <button
                      type="button"
                      className="min-w-10 flex justify-center items-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
                    >
                      3
                    </button>
                    <button
                      type="button"
                      className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                      aria-label="Next"
                    >
                      <span className="sr-only">Next</span>
                      <span aria-hidden="true">»</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Exams;
