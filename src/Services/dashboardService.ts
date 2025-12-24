import instance from "../Setup/axios";

const getDashboardData = () => {
  return instance.get(`/api/dashboard`);
};
const getChartData = (startDate: string, endDate: string) => {
  return instance.get(
    `/api/dashboard/chart?StartDate=${startDate}&EndDate=${endDate}`
  );
};
export { getDashboardData, getChartData };
