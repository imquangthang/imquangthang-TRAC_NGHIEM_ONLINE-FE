import { Route } from "react-router-dom";
import type { userState } from "../Redux/Types/user.type";
import Teacher from "../Components/Teacher/teacher";
import Exams from "../Components/Teacher/Exams/exams";
import Questions from "../Components/Teacher/Questions/questions";
import ExamDetail from "../Components/Teacher/Exams/examDetail";

const teacherRoutes = (Layouts: () => React.JSX.Element, user: userState) => {
  return (
    <Route path="/teacher" element={<Layouts />}>
      <Route index element={<Teacher />} />
      <Route path="exams" element={<Exams />} />
      <Route path="questions" element={<Questions />} />
      <Route path="examDetail" element={<ExamDetail />} />
      {/* <Route path="users" element={<UserManagement />} />
      <Route path="roles" element={<RoleManagement />} /> */}
    </Route>
  );
};

export default teacherRoutes;
