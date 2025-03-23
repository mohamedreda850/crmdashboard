import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authReducer";
import dealsReducer from "../features/dealsReducer";
import dealModalReducer from "../features/dealModalReducer";
import customerModalReducer from "../features/customerModalReducer";
import customerReducer from "../features/customerReducer"
const store = configureStore({
  reducer: {
    auth: authReducer,
    deals: dealsReducer,
    customers: customerReducer,
    dealModal: dealModalReducer,
    customerModal: customerModalReducer,
  },
});

export default store;
