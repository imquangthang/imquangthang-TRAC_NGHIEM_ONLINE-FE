import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./Redux/Reducer/loading.reducer";
import userReducer from "./Redux/Reducer/user.reducer";

export const store = configureStore({
  reducer: { loading: loadingReducer, user: userReducer },
});

//lấy root state và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
