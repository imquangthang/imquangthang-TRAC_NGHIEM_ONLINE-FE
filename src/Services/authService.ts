import instance from "../Setup/axios.ts";
import type { RegisterRequest } from "../Types/Request Type/requestType.ts";

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

export { login, register };
