import { createAction, createReducer } from "@reduxjs/toolkit";
import type { userState } from "../../Types/user.type";

// Hàm lấy dữ liệu từ localStorage với giá trị mặc định
const getUserFromStorage = (): userState => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          isAuthenticated: false,
          Token: "",
          account: {
            Id: "",
            Username: "",
            Role: "",
            FirstName: "",
            LastName: "",
            Gender: "",
            Birthdate: "",
          },
        };
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return {
      isAuthenticated: false,
      Token: "",
      account: {
        Id: "",
        Username: "",
        Role: "",
        FirstName: "",
        LastName: "",
        Gender: "",
        Birthdate: "",
      },
    };
  }
};

const initialState: userState = getUserFromStorage();

// Định nghĩa actions
export const loginUserRedux = createAction<userState>("user/loginUser");
export const updateUserRedux =
  createAction<Partial<userState["account"]>>("user/updateUser");
export const logoutUserRedux = createAction<void>("user/logoutUser");

// Reducer
const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUserRedux, (state, action) => {
      const { isAuthenticated, Token, account } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.Token = Token;
      state.account = account;
      // Lưu vào localStorage khi đăng nhập
      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Error saving user to localStorage:", error);
      }
    })
    .addCase(updateUserRedux, (state, action) => {
      state.account = { ...state.account, ...action.payload };
    })
    .addCase(logoutUserRedux, () => {
      // Xóa dữ liệu từ localStorage khi logout
      try {
        localStorage.removeItem("user");
      } catch (error) {
        console.error("Error removing user from localStorage:", error);
      }
      return initialState;
    });
});

export default userReducer;
