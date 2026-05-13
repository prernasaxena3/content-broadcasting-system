import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    items: [],
    loading: false,
    error: null,
    uploadStatus: "idle", // idle | loading | success | error
  },
  reducers: {
    setContent: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUploadStatus: (state, action) => {
      state.uploadStatus = action.payload;
    },
    addContent: (state, action) => {
      state.items = [action.payload, ...state.items];
    },
  },
});

export const { setContent, setLoading, setError, setUploadStatus, addContent } =
  contentSlice.actions;
export default contentSlice.reducer;
