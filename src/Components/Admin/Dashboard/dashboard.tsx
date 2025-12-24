import {
  faBox,
  faChartLine,
  faReceipt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../Header/header";
import { useEffect, useRef, useState } from "react";
import type { DashboardType } from "../../../Types/dashboard.type";
import {
  getChartData,
  getDashboardData,
} from "../../../Services/dashboardService";
import {
  setLoading,
  setUnLoading,
} from "../../../Redux/Reducer/loading.reducer";
import type {
  ChartDataResponse,
  ResponseType,
} from "../../../Types/response.type";
import Chart from "chart.js/auto";

const Dashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<DashboardType>({
    total_users: "0",
    total_exams: "0",
    total_submissions: "0",
    total_ongoing_exam_today: "0",
  });

  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0], // 7 ngày trước
    end: new Date().toISOString().split("T")[0], // Hôm nay
  });

  const [_chartData, setChartData] = useState<ChartDataResponse | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading();
      const response = (await getDashboardData()) as unknown as ResponseType;
      if (response && response.code === 200) {
        setDashboard(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setUnLoading();
    }
  };

  const fetchChartData = async (startDate?: string, endDate?: string) => {
    try {
      // Nếu không truyền ngày, dùng mặc định 7 ngày gần nhất (Live Data)
      const sDate = startDate
        ? new Date(startDate).toISOString()
        : new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();

      // Đặt giờ cuối ngày cho endDate để lấy trọn vẹn dữ liệu
      const eDate = endDate
        ? new Date(new Date(endDate).setHours(23, 59, 59)).toISOString()
        : new Date().toISOString();

      const response = (await getChartData(
        sDate,
        eDate
      )) as unknown as ChartDataResponse;

      if (response && response.dailyExamCounts) {
        setChartData(response);
        renderChart(response.dailyExamCounts);
      }
    } catch (error) {
      console.error("Chart Error:", error);
    }
  };

  const renderChart = (data: Record<string, number>) => {
    const ctx = document.getElementById("revenueChart") as HTMLCanvasElement;
    if (!ctx) return;

    // Hủy chart cũ nếu đã tồn tại để tránh lỗi đè chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = Object.keys(data); // Lấy các ngày: ["2025-12-17", ...]
    const values = Object.values(data); // Lấy số lượng: [0, 0, ...]

    chartRef.current = new Chart(ctx, {
      type: "line", // Hoặc 'bar' tùy bạn chọn
      data: {
        labels: labels,
        datasets: [
          {
            label: "Số lượng bài thi",
            data: values,
            borderColor: "#3b82f6", // Màu xanh dương (cordes-blue)
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: true,
            tension: 0.4, // Làm mượt đường cong
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } },
        },
      },
    });
  };

  useEffect(() => {
    fetchDashboardData();
    fetchChartData(dateRange.start, dateRange.end);
    return () => chartRef.current?.destroy();
  }, [dateRange]);

  return (
    <>
      <div className="min-h-screen w-full">
        <div className="w-full">
          {/* <!-- Top Header --> */}
          <Header />

          {/* <!-- Main Dashboard Content --> */}
          <main className="p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
            {/* <!-- Stats Cards --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* <!-- Revenue Card --> */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {dashboard.total_users}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faChartLine}
                      className="text-cordes-blue dark:text-blue-400 text-xl"
                    />
                  </div>
                </div>
              </div>

              {/* <!-- Users Card --> */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Exams
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {dashboard.total_exams}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="text-cordes-blue dark:text-blue-400 text-xl"
                    />
                  </div>
                </div>
              </div>

              {/* <!-- Orders Card --> */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Submissions
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {dashboard.total_submissions}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faReceipt}
                      className="text-cordes-blue dark:text-blue-400 text-xl"
                    />
                  </div>
                </div>
              </div>

              {/* <!-- Products Card --> */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Ongoing Exams Today
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {dashboard.total_ongoing_exam_today}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faBox}
                      className="text-cordes-blue dark:text-blue-400 text-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Charts Row --> */}
            <div className="gap-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        Thống kê kỳ thi
                        <span className="flex items-center text-[10px] font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          ● Live
                        </span>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Dữ liệu từ {dateRange.start} đến {dateRange.end}
                      </p>
                    </div>

                    {/* Bộ lọc ngày */}
                    <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-100 dark:border-gray-600">
                      <input
                        type="date"
                        className="bg-transparent text-sm text-gray-700 dark:text-gray-200 outline-none"
                        value={dateRange.start}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, start: e.target.value })
                        }
                      />
                      <span className="text-gray-400">→</span>
                      <input
                        type="date"
                        className="bg-transparent text-sm text-gray-700 dark:text-gray-200 outline-none"
                        value={dateRange.end}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, end: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="h-80 w-full">
                    <canvas id="revenueChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
