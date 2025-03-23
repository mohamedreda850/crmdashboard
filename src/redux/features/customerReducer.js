import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance, CUSTOMERS_URLS } from "../../Services/END_POINTS/DASHBOARD.JS";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const { data } = await axiosInstance.get(CUSTOMERS_URLS.GET_CUSTOMERS);
    return data;
  }
);

export const addCustomer = createAsyncThunk(
  "customers/addCustomer",
  async (customerData) => {
    const { data } = await axiosInstance.post(CUSTOMERS_URLS.CREATE_CUSTOMER, customerData);
    return data;
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ id, customerData }) => {
    const { data } = await axiosInstance.put(CUSTOMERS_URLS.UPDATE_CUSTOMER(id), customerData);
    return data;
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        );
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default customersSlice.reducer;
