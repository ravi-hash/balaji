import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    headerLogo: null,
    aboutUsContent: "",
    contactInfo: {
      // New state for contact info
      email: "theprint007@gmail.com",
      phone: "+91-9102490062, 9304060062",
      location:
        "G -3, S.B.I Building , Garikhana, Khagaul,Danapur, Bihar, India",
    },
  },
  reducers: {
    updateHeaderLogo: (state, action) => {
      state.headerLogo = action.payload;
    },
    updateAboutUsContent: (state, action) => {
      state.aboutUsContent = action.payload;
    },
    updateContactInfo: (state, action) => {
      state.contactInfo = action.payload; // Action to update contact info
    },
  },
});

// Selectors
export const selectHeaderLogo = (state) => state.admin.headerLogo;
export const selectAboutUsContent = (state) => state.admin.aboutUsContent;
export const selectContactInfo = (state) => state.admin.contactInfo; // New selector for contact info

export const { updateHeaderLogo, updateAboutUsContent, updateContactInfo } =
  adminSlice.actions;

export default adminSlice.reducer;
