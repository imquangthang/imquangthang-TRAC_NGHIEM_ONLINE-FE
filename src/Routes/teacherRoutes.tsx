import { Route } from "react-router-dom";
import type { userState } from "../Redux/Types/user.type";
import Teacher from "../Components/Teacher/teacher";
import Exams from "../Components/Teacher/Exams/exams";
import Questions from "../Components/Teacher/Questions/questions";
import ExamDetail from "../Components/Teacher/Exams/examDetail";
import OngoingExams from "../Components/Teacher/Live Rankings/ongoingExams";
import LiveRankings from "../Components/Teacher/Live Rankings/liveRankings";
import ExamHistory from "../Components/Teacher/Exam History/examHistory";
import DetailExamHistory from "../Components/Teacher/Exam History/detailExamHistory";
import DetailExamResult from "../Components/Teacher/Exam History/detailExamResult";

const teacherRoutes = (Layouts: () => React.JSX.Element, user: userState) => {
  return (
    <Route path="/teacher" element={<Layouts />}>
      <Route index element={<Teacher />} />
      <Route path="exams" element={<Exams />} />
      <Route path="questions" element={<Questions />} />
      <Route path="examDetail" element={<ExamDetail />} />
      <Route path="live-rankings" element={<OngoingExams />} />
      <Route path="live-rankings/:id" element={<LiveRankings />} />
      <Route path="exam-history" element={<ExamHistory />} />
      <Route path="exam-history/:examId" element={<DetailExamHistory />} />
      <Route
        path="exam-history/:examId/student/:studentId"
        element={<DetailExamResult />}
      />
      {/* <Route path="users" element={<UserManagement />} />
      <Route path="roles" element={<RoleManagement />} /> */}
    </Route>
  );
};

export default teacherRoutes;
