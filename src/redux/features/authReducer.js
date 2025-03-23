import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("CRM_TOKEN"),
  isAuthenticated: !!localStorage.getItem("CRM_TOKEN"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("CRM_TOKEN", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("CRM_TOKEN");
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
