import { Outlet } from "react-router-dom";
import StudentNav from "../Components/Navbar/studentNav";

const studentLayout = () => (
  <>
    <div className="flex bg-white dark:bg-black">
      <div style={{ width: "22%" }}>
        <StudentNav />
      </div>
      <div className="mx-2 relative" style={{ width: "77%" }}>
        <Outlet />
      </div>
    </div>
  </>
);

export default studentLayout;
