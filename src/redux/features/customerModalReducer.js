import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalType: null,
  customerData: null,
};

const customerModalSlice = createSlice({
  name: "customerModal",
  initialState,
  reducers: {
    openCustomerModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.customerData = action.payload.customerData || null;
    },

    closeCustomerModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.customerData = null;
    },
  },
});

export const { openCustomerModal, closeCustomerModal } =
  customerModalSlice.actions;
export default customerModalSlice.reducer;
