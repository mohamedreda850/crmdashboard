import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Services/END_POINTS/DASHBOARD.JS";
import { DEALS_URLS } from "../../Services/END_POINTS/DASHBOARD.JS";

export const fetchDeals = createAsyncThunk("deals/feachDeals", async () => {
  const { data } = await axiosInstance.get(DEALS_URLS.GET_DEALS);
  console.log(data);

  return data;
});
export const addDeal = createAsyncThunk("deals/addDeal", async (dealData) => {
  // Make sure DEALS_URLS.CREATE_DEAL is defined (often same as GET_DEALS)
  const { data } = await axiosInstance.post(DEALS_URLS.CREATE_DEAL, dealData);
  return data;
});
export const updateDeal = createAsyncThunk(
  "deals/updateDeal",
  async ({ id, dealData }) => {
    const { data } = await axiosInstance.put(
      DEALS_URLS.UPDATE_DEAL(id),
      dealData,
    );
    return data;
  },
);

const dealsSlice = createSlice({
  name: "deals",
  initialState: {
    deals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDeal.fulfilled, (state, action) => {
        state.loading = false;

        state.deals.push(action.payload);
      })
      .addCase(addDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        state.loading = false;

        state.deals = state.deals.map((deal) =>
          deal.id === action.payload.id ? action.payload : deal,
        );
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default dealsSlice.reducer;
