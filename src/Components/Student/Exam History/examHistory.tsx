import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import Header from "../../Header/header";
import { fetchStudentExamHistory } from "../../../Services/examService"; // Giả định service của bạn
import ReactPaginate from "react-paginate";

interface ExamHistoryStudent {
  id: number;
  title: string;
  score: string; // API trả về chuỗi "1,5"
  startTime: string;
  durationMinutes: number;
}

const ExamHistory = () => {
  const [exams, setExams] = useState<ExamHistoryStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const currentLimit = 10;

  const loadExams = async () => {
    setIsLoading(true);
    try {
      // API call: /api/exam/student/history?keyword=...&page=...
      const response: any = await fetchStudentExamHistory(
        searchKeyword,
        currentPage,
        currentLimit
      );
      if (response && response.objects) {
        setExams(response.objects);
        setTotalPages(response.paging.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch student history:", error);
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

  // Hàm tính End Time từ Start Time và Duration
  const calculateEndTime = (startTime: string, duration: number) => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60000);
    return end.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onSearch={(val) => setSearchKeyword(val)} />

      <main className="p-4 md:p-8 container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Table Area */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Lịch sử làm bài
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Xem lại kết quả các kỳ thi bạn đã tham gia
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-6 py-4">Bài thi</th>
                    <th className="px-6 py-4 text-center">Ngày thi</th>
                    <th className="px-6 py-4 text-center">Thời gian</th>
                    <th className="px-6 py-4 text-center">Điểm số</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {isLoading ? (
                    Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td
                            colSpan={4}
                            className="px-6 py-6 bg-gray-50/30"
                          ></td>
                        </tr>
                      ))
                  ) : exams.length > 0 ? (
                    exams.map((exam, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {exam.title}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center mt-1">
                            <FontAwesomeIcon icon={faClock} className="mr-1" />
                            Thời lượng: {exam.durationMinutes} phút
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(exam.startTime)}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                          <div className="font-medium text-gray-800 dark:text-gray-200">
                            {new Date(exam.startTime).toLocaleTimeString(
                              "vi-VN",
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </div>
                          <div className="text-[10px] uppercase text-gray-400">
                            đến{" "}
                            {calculateEndTime(
                              exam.startTime,
                              exam.durationMinutes
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-sm ${
                              parseFloat(exam.score.replace(",", ".")) >= 5
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-[10px]"
                            />
                            {exam.score}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-12 text-center text-gray-400 italic"
                      >
                        Bạn chưa tham gia kỳ thi nào hoặc không tìm thấy kết
                        quả.
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
                pageLinkClassName="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                activeLinkClassName="bg-blue-600 !border-blue-600 text-white"
                previousLinkClassName="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600"
                nextLinkClassName="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600"
                disabledClassName="opacity-40 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Sidebar Search/Filter */}
          <div className="w-full lg:w-72 space-y-4">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-widest">
                Tìm kiếm
              </h3>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Tên bài thi..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamHistory;
