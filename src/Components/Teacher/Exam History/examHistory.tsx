import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEye,
  faClock,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/header";
import { useEffect, useState } from "react";
import { fetchExamHistory } from "../../../Services/examService"; // Giả định service của bạn
import ReactPaginate from "react-paginate";
import type { Exam } from "../../../Interface/exam.interface";

const ExamHistory = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const currentLimit = 10;

  const loadExams = async () => {
    setIsLoading(true);
    try {
      const response: any = await fetchExamHistory(
        searchKeyword,
        currentPage,
        currentLimit
      );
      if (response && response.objects) {
        setExams(response.objects);
        setTotalPages(response.paging.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExams();
  }, [currentPage, searchKeyword]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onSearch={(val) => setSearchKeyword(val)} />

      <main className="p-4 md:p-8 container mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header Table */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Exam History
            </h1>

            <div className="relative w-full md:w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm bài thi..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>

          {/* Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Tên bài thi</th>
                  <th className="px-6 py-4 text-center">Thời gian bắt đầu</th>
                  <th className="px-6 py-4 text-center">Thời lượng</th>
                  <th className="px-6 py-4 text-center">Người tạo</th>
                  <th className="px-6 py-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td
                          colSpan={5}
                          className="px-6 py-4 bg-gray-50/50"
                        ></td>
                      </tr>
                    ))
                ) : exams.length > 0 ? (
                  exams.map((exam) => (
                    <tr
                      key={exam.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {exam.title}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1">
                          {exam.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="mr-2 opacity-50"
                        />
                        {formatDate(exam.startTime)}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="mr-2 opacity-50"
                        />
                        {exam.durationMinutes} phút
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        {exam.createdByName}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() =>
                            navigate(`/teacher/exam-history/${exam.id}`, {
                              state: { exam },
                            })
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all font-medium text-sm"
                        >
                          <FontAwesomeIcon icon={faEye} />
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      Không tìm thấy lịch sử bài thi nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-center">
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="<"
              containerClassName="flex items-center gap-2"
              pageLinkClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              activeLinkClassName="bg-blue-600 !border-blue-600 text-white hover:!bg-blue-700"
              previousLinkClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              nextLinkClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamHistory;
