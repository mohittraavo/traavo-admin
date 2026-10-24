import { PropsWithChildren, createContext, useContext, useEffect, useMemo } from "react";
import { clearCredentials, setCredentials } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetSessionQuery, useLoginMutation, useLogoutMutation } from "../../store/tcmsApi";
import { AuthResponse, AuthUser, LoginPayload } from "../../types/auth";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isBootstrapping: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const { data: session, isLoading: isBootstrapping, isError } = useGetSessionQuery(undefined, { skip: !token });
  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    if (session) {
      dispatch(setCredentials({ token: session.token, user: session.user }));
    }
  }, [dispatch, session]);

  useEffect(() => {
    if (token && isError) {
      dispatch(clearCredentials());
    }
  }, [dispatch, isError, token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isBootstrapping,
      async login(payload: LoginPayload) {
        const response = await loginMutation(payload).unwrap();
        dispatch(setCredentials({ token: response.token, user: response.user }));
      },
      async logout() {
        if (token) {
          try {
            await logoutMutation().unwrap();
          } finally {
            dispatch(clearCredentials());
          }
        } else {
          dispatch(clearCredentials());
        }
      }
    }),
    [dispatch, isBootstrapping, loginMutation, logoutMutation, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
