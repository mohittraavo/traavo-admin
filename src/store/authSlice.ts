import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../types/auth";

type AuthState = {
  token: string | null;
  user: AuthUser | null;
};

const initialState: AuthState = {
  token: localStorage.getItem("travo_tcms_auth_token"),
  user: readStoredUser()
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string; user: AuthUser }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("travo_tcms_auth_token", action.payload.token);
      localStorage.setItem("travo_tcms_auth_user", JSON.stringify(action.payload.user));
    },
    clearCredentials(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("travo_tcms_auth_token");
      localStorage.removeItem("travo_tcms_auth_user");
    }
  }
});

function readStoredUser(): AuthUser | null {
  const raw = localStorage.getItem("travo_tcms_auth_user");
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    localStorage.removeItem("travo_tcms_auth_user");
    return null;
  }
}

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;