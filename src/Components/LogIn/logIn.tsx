// import { useState } from "react";
import "./logIn.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
// import { toast } from "react-toastify";
// import { loginUser } from "../../services/userService";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading, setUnLoading } from "../../redux/reducer/loading.ts";
// import { loginUserRedux } from "../../redux/reducer/user.reducer.ts";

const LogIn = () => {
  // const user = useSelector((state) => state.user) || {};
  // const dispatch = useDispatch();

  let navigate = useNavigate();

  // const [valueLogin, setValueLogin] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = async () => {
  //   setObjValidInput(defaultObjValidInput);
  //   if (!valueLogin) {
  //     setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
  //     toast.error("Please enter your email address or phone number");
  //     return;
  //   }

  //   if (!password) {
  //     setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
  //     toast.error("Please enter your password");
  //     return;
  //   }

  //   dispatch(setLoading());
  //   let response = await loginUser(valueLogin, password);
  //   dispatch(setUnLoading());

  //   if (response && +response.EC === 0) {
  //     toast.success(response.EM);
  //     // Success
  //     let groupWithRoles = response.DT.groupWithRoles;
  //     let id = response.DT.id;
  //     let email = response.DT.email;
  //     let username = response.DT.username;
  //     let firstName = response.DT.firstName;
  //     let lastName = response.DT.lastName;
  //     let token = response.DT.access_token;
  //     let phone = response.DT.phone;
  //     let gender = response.DT.gender;
  //     let avatar = response.DT.avatar;
  //     let address = response.DT.address;

  //     let data = {
  //       isAuthenticated: true,
  //       token,
  //       account: {
  //         groupWithRoles,
  //         id,
  //         email,
  //         username,
  //         firstName,
  //         lastName,
  //         phone,
  //         gender,
  //         avatar,
  //         address,
  //       },
  //     };

  //     localStorage.setItem("jwt", token);
  //     localStorage.setItem("user", JSON.stringify(data));
  //     dispatch(loginUserRedux(data));
  //     switch (groupWithRoles?.name) {
  //       case "admin":
  //         navigate("/manage");
  //         break;
  //       case "hospital":
  //         navigate("/hospital");
  //         break;
  //       case "doctor":
  //         navigate("/doctor");
  //         break;
  //       case "staff":
  //         navigate("/staff");
  //         break;
  //       default:
  //         navigate("/");
  //         break;
  //     }
  //   }

  //   if (response && +response.EC !== 0) {
  //     // ERROR
  //     toast.error(response.EM);
  //   }
  // };

  // const handlePressEnter = (event) => {
  //   if (event.code === "Enter") {
  //     handleLogin();
  //   }
  // };

  return (
    <>
      <div className="bg-gradient-to-b from-white to-sky-300 min-h-screen flex items-center justify-center">
        <div className="flex min-h-full w-[400px] flex-col justify-center px-6 py-12 lg:px-8 border rounded-2xl bg-white shadow-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Log in
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" method="POST">
              <div>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="Tên đăng nhập"
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
                    placeholder="Mật khẩu"
                    minLength={6}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 appearance-none rounded-full border border-gray-300 text-indigo-600 checked:bg-indigo-600 checked:border-transparent focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm/6 text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm text-align-right">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
              </div>
            </form>

            {/* <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?
            </p> */}
            <p className="mt-5 text-center text-sm/6 text-gray-500">
              Are you a Teacher?
              <a
                href="/register?role=teacher"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {" "}
                Register now
              </a>
            </p>
            <p className="text-center text-sm/6 text-gray-500">
              Are you a Student?
              <a
                href="/register?role=student"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {" "}
                Register now
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

export default LogIn;
