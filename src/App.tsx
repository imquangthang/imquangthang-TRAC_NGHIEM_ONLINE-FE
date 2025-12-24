import { useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLoading, setUnLoading } from "./Redux/Reducer/loading.reducer";
import AppRoutes from "./Routes/appRoutes";
import { ToastContainer } from "react-toastify";
import { RotatingTriangles } from "react-loader-spinner";
import { initDropdowns } from "flowbite";

function App() {
  const location = useLocation();
  const user = useSelector((state: any) => state.user) || {};
  const isLoading =
    useSelector((state: any) => state.loading.isLoading) || false;
  const token = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading());
    if (!token) {
      navigate("/login");
    } else {
      switch (user?.account?.Role) {
        case "1":
          navigate("/admin");
          break;
        case "2":
          navigate("/student");
          break;
        case "3":
          navigate("/teacher");
          break;
        default:
          navigate("/");
          break;
      }
    }
    dispatch(setUnLoading());
  }, [token]);

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
        <div className="fixed z-10 top-0 start-0 w-screen h-screen flex justify-center items-center bg-white">
          <div className="text-center">
            <RotatingTriangles
              visible={true}
              height="100"
              width="100"
              colors={["#f44336", "#4fa94d", "#2196f3"]}
              ariaLabel="rotating-triangles-loading"
            />
            <p className="inline-block">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
