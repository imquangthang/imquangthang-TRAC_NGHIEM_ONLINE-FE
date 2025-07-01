import { Outlet } from "react-router-dom";
import AdminNav from "../Components/Navbar/adminNav";

const adminLayout = () => (
  <>
    <div className="flex bg-white dark:bg-black">
      <div style={{ width: "22%" }}>
        <AdminNav />
      </div>
      <div className="mx-2 relative" style={{ width: "77%" }}>
        <Outlet />
      </div>
    </div>
  </>
);

export default adminLayout;
