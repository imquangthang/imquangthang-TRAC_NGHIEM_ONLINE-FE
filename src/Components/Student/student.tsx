import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/header";
import { useEffect, useState } from "react";
import ModalAddNewExam from "../Teacher/Exams/modalAddNewExam";
import ReactPaginate from "react-paginate";
import { fetchAllExams } from "../../Services/examService";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Student: React.FC = () => {
  const navigate = useNavigate();
  const [openModalAddNewExam, setOpenModalAddNewExam] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, _setCurrentLimit] = useState(5);
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

  const openModal = () => {
    setOpenModalAddNewExam(true);
  };
  return (
    <>
      <Header onSearch={handleSearch} />

      <main>
        <div className="flex justify-between gap-5 p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
          <div className="flex-1">
            <div className="font-bold text-5xl text-center mb-2 text-gray-900 dark:text-white">
              List Of Exams
            </div>
            {isLoadingExam ? (
              <>
                <div className="w-full flex flex-col items-center p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full max-w-screen-xl">
                    {[...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
                      >
                        <Skeleton variant="text" height={24} width="80%" />
                        <Skeleton
                          variant="text"
                          height={20}
                          width="100%"
                          className="mt-5"
                        />
                        <Skeleton
                          variant="text"
                          height={20}
                          width="75%"
                          className="mt-5"
                        />
                        <Skeleton
                          variant="text"
                          height={20}
                          width="66%"
                          className="mt-5"
                        />
                        <Skeleton
                          variant="rectangular"
                          height={48}
                          width="33%"
                          className="mt-8 mx-auto"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-screen-xl lg:mx-32">
                    {[...Array(2)].map((_, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
                      >
                        <Skeleton variant="text" height={20} width="80%" />
                        <Skeleton
                          variant="text"
                          height={20}
                          width="100%"
                          className="mt-5"
                        />
                        <Skeleton
                          variant="text"
                          height={20}
                          width="75%"
                          className="mt-5"
                        />
                        <Skeleton
                          variant="text"
                          height={20}
                          width="66%"
                          className="mt-5"
                        />
                        <Skeleton
                          variant="rectangular"
                          height={48}
                          width="33%"
                          className="mt-8 mx-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {listExams && listExams.length > 0 ? (
                  <>
                    <div className="w-full flex flex-col items-center">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* 3 cards đầu tiên */}
                        {listExams.slice(0, 3).map((exam: any, index) => (
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
                              <b>Created_by:</b> {exam.createdByName}
                            </p>
                            <div className="flex justify-center">
                              <button
                                className="mt-4 bg-blue-400 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 dark:hover:bg-blue-700"
                                onClick={() =>
                                  navigate(`/student/exam/${exam.id}`)
                                }
                              >
                                Làm bài
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 2 cards dưới, căn giữa bằng flex */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:mx-32">
                        {listExams.slice(3, 5).map((exam: any, index) => (
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
                              <b>Created_by:</b> {exam.createdByName}
                            </p>
                            <div className="flex justify-center">
                              <button
                                className="mt-4 bg-blue-400 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 dark:hover:bg-blue-700"
                                onClick={() =>
                                  navigate(`/teacher/exams/${exam.id}`)
                                }
                              >
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
              </>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col items-end space-y-2 mt-4">
              <button
                className="flex items-center w-full gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => {
                  openModal();
                }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="icon text-gray-700 dark:text-gray-200"
                />
                <span className="text-sm text-gray-900 dark:text-gray-200">
                  Insert Exam
                </span>
              </button>
            </div>

            <div className="py-1 px-4">
              {totalPages > 0 && (
                <ReactPaginate
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={0}
                  marginPagesDisplayed={0}
                  pageCount={totalPages}
                  previousLabel="<"
                  previousLinkClassName="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                  nextLinkClassName="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                  breakLabel="..."
                  breakClassName="flex items-center justify-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                  breakLinkClassName="text-gray-700 dark:text-gray-300"
                  renderOnZeroPageCount={null}
                  containerClassName="flex items-center justify-center gap-2 my-6"
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
      </main>

      <ModalAddNewExam
        open={openModalAddNewExam}
        onClose={() => setOpenModalAddNewExam(false)}
      />
    </>
  );
};
export default Student;
