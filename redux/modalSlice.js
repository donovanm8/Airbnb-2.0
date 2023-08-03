import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupModalOpen: false,
  loginModalOpen: false,
  headerOpen : false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignupModal: (state) => {
      state.signupModalOpen = true;
    },
    closeSignupModal: (state) => {
      state.signupModalOpen = false;
    },
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
    openHeader : (state) => {
      state.headerOpen = true
    },
    closeHeader : (state) => {
      state.headerOpen = false
    },
  },
});

export const { openSignupModal, closeSignupModal,closeHeader,openHeader,openLoginModal,closeLoginModal } = modalSlice.actions;

export default modalSlice.reducer;
