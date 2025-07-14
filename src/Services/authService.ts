import instance from "../Setup/axios.ts";
import type { RegisterRequest } from "../Types/request.type.ts";

const login = (username: string, password: string) => {
  return instance.post("/api/user/login", { username, password });
};

// Gọi API đăng ký
const register = (data: RegisterRequest) => {
  const formData = new FormData();
  formData.append("Email", data.Email);
  formData.append("Username", data.Username);
  formData.append("Password", data.Password);
  return instance.post("/api/user/register", formData);
};

const forgotPassword = (email: string) => {
  return instance.post("/api/user/forgot-password", JSON.stringify(email), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { login, register, forgotPassword };
