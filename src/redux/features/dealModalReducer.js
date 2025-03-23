import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,

  modalType: null,
  dealData: null,
};

const dealModalSlice = createSlice({
  name: "dealModal",
  initialState,
  reducers: {
    openDealModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.dealData = action.payload.dealData || null;
    },

    closeDealModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.dealData = null;
    },
  },
});

export const { openDealModal, closeDealModal } = dealModalSlice.actions;
export default dealModalSlice.reducer;
