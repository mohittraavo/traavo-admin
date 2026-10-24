export type AuthUser = {
  userId: number;
  tenantId: number;
  fullName: string;
  email: string;
  role: string;
  permissions?: string[];
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export type LoginPayload = {
  email: string;
  password: string;
};
