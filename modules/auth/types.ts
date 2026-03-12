export type LoginInput = {
  email: string;
  password: string;
};

export type AuthSession = {
  userId: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  regNumber?: string;
};

export type TokenPayload = {
  userId: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  regNumber?: string;
};

export type LoginResponse = {
  user: AuthSession;
  token: string;
  expiresAt: string;
};

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ForgotPasswordInput = {
  email: string;
};
