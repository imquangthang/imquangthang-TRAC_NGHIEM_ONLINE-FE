import { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchExamHistoryDetail } from "../../../Services/examService";
import ReactPaginate from "react-paginate";
import Header from "../../Header/header";
import type { Exam } from "../../../Interface/exam.interface";

interface Answer {
  questionId: number;
  selectedAnswerId: number;
}

interface StudentResult {
  studentId: number;
  firstName: string;
  lastName: string;
  score: string;
  answers: Answer[];
}

const DetailExamHistory = () => {
  const { examId } = useParams<{ examId: string }>();
  const location = useLocation();
  const [detailExam, _setDetailExam] = useState<Exam | null>(
    (location.state as any)?.exam || null
  );
  const navigate = useNavigate();

  const [results, setResults] = useState<StudentResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  const loadData = useCallback(async () => {
    if (!examId) return;
    setIsLoading(true);
    try {
      const response: any = await fetchExamHistoryDetail(
        parseInt(examId),
        currentPage,
        10
      );
      if (response && response.objects) {
        const sorted = [...response.objects].sort((a, b) => {
          const scoreA = parseFloat(a.score.replace(",", "."));
          const scoreB = parseFloat(b.score.replace(",", "."));
          return scoreB - scoreA;
        });
        setResults(sorted);
        setTotalPages(response.paging.totalPages);
      }
    } catch (error) {
      console.error("Error loading exam details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [examId, currentPage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="p-4 md:p-8 container mx-auto flex-1">
        <nav className="mb-6 flex items-center text-sm text-gray-500">
          <span
            className="hover:text-blue-600 hover:font-medium cursor-pointer"
            onClick={() => navigate(`/teacher/exam-history`)}
          >
            Exam History
          </span>
          <span className="mx-2">/</span>
          <span className="text-blue-600 font-medium">{detailExam?.title}</span>
        </nav>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Top Bar */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Danh sách thí sinh
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Tổng cộng {results.length} lượt làm bài trên trang này
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                placeholder="Tìm tên thí sinh..."
                className="pl-10 pr-4 py-2.5 w-full border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Hạng</th>
                  <th className="px-6 py-4">Thí sinh</th>
                  <th className="px-6 py-4 text-center">Số câu đã trả lời</th>
                  <th className="px-6 py-4 text-center">Điểm số</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {!isLoading ? (
                  results
                    .filter((r) =>
                      `${r.firstName} ${r.lastName}`
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase())
                    )
                    .map((student, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group"
                      >
                        <td className="px-6 py-4 w-20">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold ${
                              index === 0 && currentPage === 1
                                ? "bg-yellow-100 text-yellow-700"
                                : index === 1 && currentPage === 1
                                ? "bg-gray-300 text-gray-700"
                                : index === 2 && currentPage === 1
                                ? "bg-orange-100 text-orange-700"
                                : "text-gray-500"
                            }`}
                          >
                            {(currentPage - 1) * 10 + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                              <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {student.firstName} {student.lastName}
                              </div>
                              <div className="text-xs text-gray-400">
                                ID: {student.studentId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                          {student.answers.length} câu
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full font-bold text-sm ${
                              parseFloat(student.score.replace(",", ".")) >= 8
                                ? "bg-green-100 text-green-700"
                                : parseFloat(student.score.replace(",", ".")) >=
                                  5
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.score} / 10
                          </span>
                        </td>
                        {/* <td className="px-6 py-4 text-right">
                          <button
                            onClick={() =>
                              navigate(
                                `/teacher/exam-history/${examId}/student/${student.studentId}`,
                                { state: { student } }
                              )
                            }
                            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            title="Xem chi tiết bài làm"
                          >
                            <FontAwesomeIcon icon={faEye} size="lg" />
                          </button>
                        </td> */}
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-400 animate-pulse"
                    >
                      Đang tải kết quả...
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
              pageLinkClassName="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              activeLinkClassName="bg-blue-600 !border-blue-600 text-white"
              previousLinkClassName="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600"
              nextLinkClassName="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailExamHistory;
