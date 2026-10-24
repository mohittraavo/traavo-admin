import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FeedbackState = {
  pendingRequests: number;
  successMessage: string | null;
};

const initialState: FeedbackState = {
  pendingRequests: 0,
  successMessage: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    requestStarted(state) {
      state.pendingRequests += 1;
    },
    requestFinished(state) {
      state.pendingRequests = Math.max(0, state.pendingRequests - 1);
    },
    operationSucceeded(state, action: PayloadAction<string>) {
      state.successMessage = action.payload;
    },
    dismissSuccess(state) {
      state.successMessage = null;
    },
  },
});

export const {
  requestStarted,
  requestFinished,
  operationSucceeded,
  dismissSuccess,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
