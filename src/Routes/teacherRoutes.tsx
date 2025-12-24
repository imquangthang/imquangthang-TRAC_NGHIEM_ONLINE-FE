import { Route } from "react-router-dom";
import type { userState } from "../Types/user.type";
import Teacher from "../Components/Teacher/teacher";
import Questions from "../Components/Teacher/Questions/questions";
import ExamDetail from "../Components/Teacher/Exams/examDetail";
import OngoingExams from "../Components/Teacher/Live Rankings/ongoingExams";
import LiveRankings from "../Components/Teacher/Live Rankings/liveRankings";
import ExamHistory from "../Components/Teacher/Exam History/examHistory";
import DetailExamHistory from "../Components/Teacher/Exam History/detailExamHistory";
// import DetailExamResult from "../Components/Teacher/Exam History/detailExamResult";
import TeacherExams from "../Components/Teacher/Exams/exams";

const teacherRoutes = (Layouts: () => React.JSX.Element, _user: userState) => {
  return (
    <Route path="/teacher" element={<Layouts />}>
      <Route index element={<Teacher />} />
      <Route path="exams" element={<TeacherExams />} />
      <Route path="exams/:id" element={<ExamDetail />} />
      <Route path="questions" element={<Questions />} />
      <Route path="live-rankings" element={<OngoingExams />} />
      <Route path="live-rankings/:examId" element={<LiveRankings />} />
      <Route path="exam-history" element={<ExamHistory />} />
      <Route path="exam-history/:examId" element={<DetailExamHistory />} />
      {/* <Route
        path="exam-history/:examId/student/:studentId"
        element={<DetailExamResult />}
      /> */}
    </Route>
  );
};

export default teacherRoutes;
