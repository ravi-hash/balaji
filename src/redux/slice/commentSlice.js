import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [], // Stores comments globally
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    ADD_COMMENT: (state, action) => {
      state.comments.push(action.payload);
    },
  },
});

export const { ADD_COMMENT } = commentSlice.actions;

export const selectComments = (state) => state.comments.comments;

export default commentSlice.reducer;
