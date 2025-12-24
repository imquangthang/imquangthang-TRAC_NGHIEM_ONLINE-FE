import { useState } from "react";
import "./logIn.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/Logo.png";
import { toast } from "react-toastify";
import { login } from "../../Services/authService.ts";
import { useDispatch } from "react-redux";
import {
  setLoading,
  setUnLoading,
} from "../../Redux/Reducer/loading.reducer.ts";
import { loginUserRedux } from "../../Redux/Reducer/user.reducer.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../Setup/firebase.ts";
import { ref, set } from "firebase/database";

const LogIn = () => {
  // const user = useSelector((state: any) => state.user) || {};
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    dispatch(setLoading());
    try {
      // Try backend login
      let response: any = await login(valueLogin, password);

      if (response && +response.code === 200) {
        toast.success(response.EM);
        const {
          Role,
          Token,
          Id,
          Email,
          Username,
          FirstName = "",
          LastName = "",
          Gender = "",
          Birthdate = "",
        } = response.data;

        // Map backend roles to Firebase roles
        const roleMap: { [key: string]: string } = {
          "1": "admin",
          "2": "teacher",
          "3": "student",
        };
        const firebaseRole = roleMap[Role] || "student";

        // Validate name
        const name =
          `${FirstName} ${LastName}`.trim() || Username || "New User";
        if (!name) {
          throw new Error("Tên người dùng không hợp lệ.");
        }

        try {
          // Try Firebase login
          let uid: string;
          try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              Email,
              password
            );
            uid = userCredential.user.uid;
          } catch (err: any) {
            if (err.code === "auth/invalid-credential") {
              // Auto-register
              const userCredential = await createUserWithEmailAndPassword(
                auth,
                Email,
                password
              );
              uid = userCredential.user.uid;
            } else {
              throw err;
            }
          }

          // Save user data to Firebase (exclude role)
          await set(ref(db, `users/${uid}`), {
            name,
            email: Email,
          }).catch((err) => {
            console.error("Error setting user data:", err);
            throw new Error(
              `Không thể lưu thông tin người dùng: ${err.message}`
            );
          });

          // Save role to roles/$uid
          await set(ref(db, `roles/${uid}`), firebaseRole).catch((err) => {
            console.error("Error setting role:", err);
            throw new Error(`Không thể gán vai trò: ${err.message}`);
          });

          // Store data in Redux and localStorage
          const data = {
            isAuthenticated: true,
            Token,
            account: {
              Id,
              Firebase_Uid: uid,
              Email,
              Username,
              Role,
              FirstName,
              LastName,
              Gender,
              Birthdate,
            },
          };

          localStorage.setItem("jwt", Token);
          localStorage.setItem("user", JSON.stringify(data));
          dispatch(loginUserRedux(data));

          // Navigate based on role
          switch (firebaseRole) {
            case "admin":
              navigate("/admin");
              break;
            case "teacher":
              navigate("/teacher");
              break;
            case "student":
              navigate("/student");
              break;
            default:
              navigate("/");
              break;
          }
        } catch (err: any) {
          toast.error(`Lỗi Firebase: ${err.message}`);
        }
      } else {
        toast.error(response.msgNo || "Lỗi đăng nhập từ backend");
      }
    } catch (err: any) {
      toast.error(`Lỗi đăng nhập: ${err.message}`);
    } finally {
      dispatch(setUnLoading());
    }

    console.log(auth);
  };

  const handlePressEnter = (event: any) => {
    if (event.code === "Enter") {
      handleLogin();
    }
  };

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
            <form
              className="space-y-6"
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div>
                <div className="mt-2">
                  <input
                    type="Username"
                    name="Username"
                    id="Username"
                    autoComplete="Username"
                    placeholder="Tên đăng nhập"
                    required
                    value={valueLogin}
                    onChange={(e) => setValueLogin(e.target.value)}
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
                    placeholder="Mật khẩu"
                    minLength={6}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onKeyDown={handlePressEnter}
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
                    <Link
                      to="/forgot-password"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
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
