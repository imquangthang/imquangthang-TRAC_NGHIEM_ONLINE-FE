import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/Logo.png";
import { toast } from "react-toastify";
// import { setLoading, setUnLoading } from "../../redux/reducer/loading.ts";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role"); // "teacher" hoặc "student"
  console.log("Role from query params:", role);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user) || {};

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isUsername: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  let navigate = useNavigate();

  useEffect(() => {
    if (user && user.isAuthenticated) {
      navigate("/");
    }
  }, []);

  const isValidInput = () => {
    setObjCheckInput(defaultValidInput);

    if (password !== confirmPassword) {
      setObjCheckInput({
        ...defaultValidInput,
        isValidConfirmPassword: false,
      });
      toast.error("Your password is not the same");
      return false;
    }

    return true;
  };

  // const handleRegister = async () => {
  //   let check = isValidInput();

  //   if (check === true) {
  //     dispatch(setLoading());
  //     let serverData = await registerNewUser(
  //       firstName,
  //       lastName,
  //       email,
  //       phone,
  //       username,
  //       password
  //     );
  //     dispatch(setUnLoading());
  //     if (+serverData.EC === 0) {
  //       toast.success(serverData.EM);
  //       navigate("/login");
  //     } else {
  //       toast.error(serverData.EM);
  //       if (+serverData.EC === 1) {
  //         setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
  //       } else if (+serverData.EC === 2) {
  //         setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
  //       } else if (+serverData.EC === 3) {
  //         setObjCheckInput({ ...defaultValidInput, isUsername: false });
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (user && user.isAuthenticated) {
  //     console.log(user);
  //     window.history.back();
  //   }
  // }, [user]);

  return (
    <>
      {/* <div className="max-h-screen">
        <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
          <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
            <div className="md:w-1/2 px-5">
              <h2 className="text-2xl font-bold text-[#002D74]">Register</h2>
              <p className="text-sm mt-4 text-[#002D74]">
                If you don't have an account, please register
              </p>
              <form className="mt-6" action="#" method="POST">
                <div>
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder="Enter Email Address"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    autoFocus
                    autoComplete="on"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    name=""
                    id=""
                    placeholder="Enter Password"
                    minLength={6}
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                >
                  Register
                </button>
              </form>

              <div className="text-sm flex justify-between items-center mt-3">
                <p>If you have an account...</p>
                <button
                  className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
              </div>
            </div>

            <div className="w-1/2 md:block">
              <img
                src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                className="rounded-2xl"
                alt="page img"
              />
            </div>
          </div>
        </section>
      </div> */}
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
                isValidInput();
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
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
