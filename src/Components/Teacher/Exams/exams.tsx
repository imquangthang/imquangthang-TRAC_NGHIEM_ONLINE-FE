import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../Header/header";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchAllExams } from "../../../Services/examService";
import { Skeleton } from "@mui/material";

const Exams = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, _setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [listExams, setListExams] = useState([]);
  const [isLoadingExam, setIsLoadingExam] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handlePageClick = async (event: { selected: number }) => {
    setCurrentPage(+event.selected + 1);
  };

  const fetchExams = async () => {
    setIsLoadingExam(true);
    let response: any = await fetchAllExams(
      searchKeyword,
      currentPage,
      currentLimit
    );

    if (response) {
      setListExams(response.objects);
      setTotalPages(response.paging.totalPages);
    }
    setIsLoadingExam(false);
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    console.log("Giá trị tìm kiếm từ Header:", value);
  };

  useEffect(() => {
    fetchExams();
  }, [currentPage, searchKeyword]);
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <!-- Top Header --> */}
      <Header onSearch={handleSearch} />
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
                      {isLoadingExam ? (
                        <>
                          {[...Array(10)].map((_, index) => (
                            <tr
                              className="hover:bg-gray-50 dark:hover:bg-gray-700"
                              key={index}
                            >
                              <td className="px-6 py-4 text-sm font-medium">
                                <Skeleton
                                  variant="text"
                                  width={20}
                                  height={20}
                                />
                              </td>
                              <td className="px-6 py-4 text-sm font-medium">
                                <Skeleton
                                  variant="text"
                                  width="70%"
                                  height={20}
                                />
                              </td>
                              <td className="px-6 py-4 text-sm">
                                <Skeleton
                                  variant="text"
                                  width="100%"
                                  height={20}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Skeleton
                                  variant="text"
                                  width={40}
                                  height={20}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Skeleton
                                  variant="text"
                                  width={80}
                                  height={20}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <div className="flex justify-end space-x-3">
                                  <Skeleton
                                    variant="circular"
                                    width={20}
                                    height={20}
                                  />
                                  <Skeleton
                                    variant="circular"
                                    width={20}
                                    height={20}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <>
                          {" "}
                          {listExams && listExams.length > 0 ? (
                            <>
                              {listExams.map((exam: any, index) => (
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
                                    {exam.createdByName}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <FontAwesomeIcon
                                      icon={faPen}
                                      className="text-yellow-500 dark:text-yellow-400 cursor-pointer mx-3"
                                    />
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="text-red-500 dark:text-red-400 cursor-pointer"
                                    />
                                  </td>
                                </tr>
                              ))}
                            </>
                          ) : (
                            <p className="text-gray-500 dark:text-gray-400">
                              Không có bài kiểm tra nào.
                            </p>
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="py-1 px-4">
                  {totalPages > 0 && (
                    <ReactPaginate
                      nextLabel=">"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={1}
                      marginPagesDisplayed={2}
                      pageCount={totalPages}
                      previousLabel="<"
                      previousLinkClassName="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                      nextLinkClassName="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                      breakLabel="..."
                      breakClassName="flex items-center justify-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                      breakLinkClassName="text-gray-700 dark:text-gray-300"
                      renderOnZeroPageCount={null}
                      containerClassName="flex items-center justify-center gap-2 my-1"
                      pageClassName="flex items-center justify-center"
                      pageLinkClassName="flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-gray-300 rounded-md hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                      activeClassName="bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                      previousClassName="flex items-center justify-center"
                      nextClassName="flex items-center justify-center"
                      disabledClassName="opacity-50 cursor-not-allowed"
                    />
                  )}
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
