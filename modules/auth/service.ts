import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "@/lib/errors";
import * as authQueries from "./queries";
import type { LoginInput, LoginResponse, TokenPayload, ChangePasswordInput } from "./types";

const JWT_SECRET = process.env.JWT_SECRET ?? "pfa-dev-secret-change-in-production";
const JWT_EXPIRY = "7d";

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12);
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export async function login(input: LoginInput): Promise<LoginResponse> {
  const user = await authQueries.findUserByEmail(input.email);
  if (!user) throw new UnauthorizedError("Invalid email or password");
  if (!verifyPassword(input.password, user.passwordHash)) {
    throw new UnauthorizedError("Invalid email or password");
  }
  await authQueries.updateLastLogin(user.id);
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    regNumber: user.student?.regNumber,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  return {
    user: {
      userId: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      regNumber: user.student?.regNumber,
    },
    token,
    expiresAt,
  };
}

export function verifyToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }
}

export async function changePassword(
  userId: string,
  input: ChangePasswordInput
): Promise<void> {
  const user = await authQueries.findUserById(userId);
  if (!user) throw new UnauthorizedError();
  if (!verifyPassword(input.currentPassword, user.passwordHash)) {
    throw new UnauthorizedError("Current password is incorrect");
  }
  const hashed = hashPassword(input.newPassword);
  await authQueries.updateUserPassword(userId, hashed);
}
