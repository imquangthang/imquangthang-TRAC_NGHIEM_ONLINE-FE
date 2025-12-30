import instance from "../Setup/axios.ts";
import type { RegisterRequest } from "../Types/request.type.ts";

const login = (username: string, password: string) => {
  return instance.post("/api/user/login", { username, password });
};

const registerStudent = (data: RegisterRequest) => {
  const formData = new FormData();
  formData.append("Email", data.Email);
  formData.append("Username", data.Username);
  formData.append("Password", data.Password);
  return instance.post("/api/user/register/student", formData);
};

const registerTeacher = (data: RegisterRequest) => {
  const formData = new FormData();
  formData.append("Email", data.Email);
  formData.append("Username", data.Username);
  formData.append("Password", data.Password);
  return instance.post("/api/user/register/teacher", formData);
};

const forgotPassword = (email: string) => {
  return instance.post("/api/user/forgot-password", JSON.stringify(email), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const verifyOTP = (email: string, otp: string) => {
  return instance.post(
    "/api/user/verify-otp",
    JSON.stringify({ otp: otp, email: email }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const resetPassword = (email: string, newPassword: string) => {
  return instance.post(
    "/api/user/reset-password",
    JSON.stringify({ email: email, newPassword: newPassword }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export {
  login,
  registerStudent,
  registerTeacher,
  forgotPassword,
  resetPassword,
  verifyOTP,
};
