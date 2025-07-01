import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/footer";
import TeacherNav from "../Components/Navbar/teacherNav";

const teacherLayout = () => (
  <>
    <div className="flex bg-white dark:bg-black  ">
      <div style={{ width: "22%" }}>
        <TeacherNav />
      </div>
      <div className="mx-2 relative" style={{ width: "77%" }}>
        <Outlet />
      </div>
    </div>
  </>
);

export default teacherLayout;
