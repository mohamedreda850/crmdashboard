import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authReducer";
import dealsReducer from "../features/dealsReducer";
import dealModalReducer from "../features/dealModalReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    deals: dealsReducer,
    dealModal: dealModalReducer,
  },
});

export default store;
