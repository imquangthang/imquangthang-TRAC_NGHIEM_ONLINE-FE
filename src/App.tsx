import { useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLoading, setUnLoading } from "./Redux/Reducer/loading";
import AppRoutes from "./Routes/appRoutes";
import { ToastContainer } from "react-toastify";
import { RotatingTriangles } from "react-loader-spinner";
import type { userState } from "./Redux/Types/user.type";
import { initDropdowns } from "flowbite";

function App() {
  const location = useLocation();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user = useSelector((state: any) => state.user) || {};
  // const token = localStorage.getItem("jwt");
  const isLoading =
    useSelector((state: any) => state.loading.isLoading) || false;

  // useEffect(() => {
  //   dispatch(setLoading());
  //   if (!token) {
  //     navigate("/login");
  //   }
  //   dispatch(setUnLoading());
  // }, [token]);

  let user: userState = {
    isAuthenticated: true,
    token: "sample-token",
    account: {
      id: "0",
      username: "",
      email: "",
      groupWithRoles: {
        _id: "0",
        name: "teacher",
        description: "adada",
      },
      firstName: "",
      lastName: "",
      phone: "",
      gender: "",
      avatar: "",
      address: "",
    },
  };

  useEffect(() => {
    initDropdowns();
  }, [location.pathname]);

  return (
    <>
      {/* <Router> */}
      <AppRoutes user={user} />

      {/* <ToastContainer> */}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* <Loading web> */}
      {isLoading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-white"
          style={{ zIndex: 2000 }}
        >
          <RotatingTriangles
            visible={true}
            height="100"
            width="100"
            colors={["#4fa94d", "#4fa94d", "#4fa94d"]}
            ariaLabel="rotating-triangles-loading"
          />
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default App;
