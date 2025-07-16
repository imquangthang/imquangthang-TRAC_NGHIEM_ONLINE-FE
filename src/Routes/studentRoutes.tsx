import { Route } from "react-router-dom";
import type { userState } from "../Types/user.type";
import Student from "../Components/Student/student";
import Exams from "../Components/Student/Exams/exams";
import ExamDetail from "../Components/Student/Exams/examDetail";
import Leaderboard from "../Components/Student/Leaderboard/leaderboard";
import LeaderboardDetail from "../Components/Student/Leaderboard/leaderboardDetail";
import ExamHistory from "../Components/Student/Exam History/examHistory";

const studentRoutes = (Layouts: () => React.JSX.Element, user: userState) => {
  /* User Routes */
  return (
    <Route path="/student" element={<Layouts />}>
      <Route index element={<Student />} />
      <Route path="exams" element={<Exams />} />
      <Route
        path="exam/:id"
        element={<ExamDetail userId={user?.account?.Id} />}
      />
      <Route path="leaderboard" element={<Leaderboard />} />
      <Route path="leaderboard/:id" element={<LeaderboardDetail />} />
      <Route path="exam-history" element={<ExamHistory />} />
    </Route>
  );
};

export default studentRoutes;
