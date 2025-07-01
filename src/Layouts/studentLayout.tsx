import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/footer";
import StudentNav from "../Components/Navbar/studentNav";

const studentLayout = () => (
  <>
    <StudentNav />
    <Outlet />
    <Footer />
  </>
);

export default studentLayout;
