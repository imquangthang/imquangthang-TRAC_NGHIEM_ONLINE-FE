import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/Logo.png";
import { toast } from "react-toastify";
import {
  setLoading,
  setUnLoading,
} from "../../Redux/Reducer/loading.reducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Services/authService.ts";

const Register = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user) || {};

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // const defaultValidInput = {
  //   isValidEmail: true,
  //   isUsername: true,
  //   isValidPassword: true,
  //   isValidConfirmPassword: true,
  // };

  let navigate = useNavigate();

  useEffect(() => {
    if (user && user.isAuthenticated) {
      navigate("/");
    }
  }, []);

  const isValidInput = () => {
    if (password !== confirmPassword) {
      toast.error("Your password is not the same");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    let check = isValidInput();

    if (check === true) {
      try {
        dispatch(setLoading());
        let response: any = await register({
          Email: email,
          Username: username,
          Password: password,
        });
        if (response) {
          if (+response.code === 200) {
            toast.success("Register successfully");
            navigate("/login");
          } else {
            toast.error(response.msgNo);
          }
        }
        dispatch(setUnLoading());
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("An error occurred during registration. Please try again.");
        return;
      }
    }
  };

  useEffect(() => {
    if (user && user.isAuthenticated) {
      console.log(user);
      window.history.back();
    }
  }, [user]);

  return (
    <>
      <div className="bg-gradient-to-b from-white to-sky-300 min-h-screen flex items-center justify-center">
        <div className="flex min-h-full w-[400px] flex-col justify-center px-6 py-12 lg:px-8 border rounded-2xl bg-white shadow-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Register Account {role === "teacher" ? "Teacher" : "Student"}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              method="POST"
            >
              <div>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <input
                    type="username"
                    name="username"
                    id="username"
                    autoComplete="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    minLength={6}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <input
                    type="password"
                    name="repeat-password"
                    id="repeat-password"
                    placeholder="Repeat-password"
                    minLength={6}
                    autoComplete="current-repeat-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              You are member?
              <a
                href="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {" "}
                Login now
              </a>
            </p>

            <div className="mt-2 flex items-center justify-center">
              <div>
                <img
                  src={Logo}
                  alt="Logo"
                  className="mx-auto mt-4 h-20 w-auto"
                />
              </div>
              <div>
                <p className="mt-2 text-center text-sm/6 text-gray-500 font-overlock border-b-2 border-gray-300">
                  <b>ONLINE QUIZ</b>
                </p>
                <p className="text-center text-sm/6 text-gray-500">
                  Quick Test – Accurate Results!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
