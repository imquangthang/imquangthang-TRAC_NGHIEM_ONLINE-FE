import { Routes, Route } from "react-router-dom";
import adminLayout from "../Layouts/adminLayout";
import teacherLayout from "../Layouts/teacherLayout";
import studentLayout from "../Layouts/studentLayout";
import adminRoutes from "./adminRoutes";
import teacherRoutes from "./teacherRoutes";
import studentRoutes from "./studentRoutes";
import type { userState } from "../Redux/Types/user.type";
import Register from "../Components/Register/register";
import Page404 from "../Components/Page404/Page404";
import LogIn from "../Components/LogIn/logIn";
import ImportDeThi from "../Components/importDeThi";

interface AppRoutesProps {
  user: userState;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ user }) => (
  <Routes>
    {(() => {
      switch (user?.account?.Role) {
        case "0":
          return adminRoutes(adminLayout);
        case "1":
          return teacherRoutes(teacherLayout, user);
        case "2":
          return studentRoutes(studentLayout, user);
      }
    })()}
    <Route path="/login" element={<LogIn />} />
    <Route path="/register" element={<Register />} />
    <Route path="/import" element={<ImportDeThi />} />
    {/* <Route path="/chat" element={<Chat userId={user.account.id}/>} /> */}
    <Route path="*" element={<Page404 />} />;
  </Routes>
);

export default AppRoutes;
