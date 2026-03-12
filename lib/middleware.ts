import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import type { Role } from "@prisma/client";
import { UnauthorizedError, ForbiddenError } from "./errors";

export type AuthSession = {
  userId: string;
  email: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  regNumber?: string;
};

const JWT_SECRET = process.env.JWT_SECRET ?? "pfa-dev-secret-change-in-production";

export async function getSession(request: NextRequest): Promise<AuthSession | null> {
  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: Role;
      firstName?: string;
      lastName?: string;
      regNumber?: string;
    };
    return decoded;
  } catch {
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<AuthSession> {
  const session = await getSession(request);
  if (!session) throw new UnauthorizedError();
  return session;
}

export async function requireRole(
  request: NextRequest,
  ...roles: Role[]
): Promise<AuthSession> {
  const session = await requireAuth(request);
  if (!roles.includes(session.role)) throw new ForbiddenError();
  return session;
}

type RouteHandler = (
  request: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  session: AuthSession
) => Promise<Response>;

export function withAuth(
  handler: RouteHandler,
  ...allowedRoles: Role[]
) {
  return async (
    request: NextRequest,
    context: { params?: Promise<Record<string, string>> }
  ): Promise<Response> => {
    const { handleApiError } = await import("./errors");
    try {
      const session = await requireRole(request, ...allowedRoles);
      return handler(request, context, session);
    } catch (error) {
      return handleApiError(error, "withAuth");
    }
  };
}

export function withAuthOptional(
  handler: (
    request: NextRequest,
    context: { params?: Promise<Record<string, string>> },
    session: AuthSession | null
  ) => Promise<Response>
) {
  return async (
    request: NextRequest,
    context: { params?: Promise<Record<string, string>> }
  ): Promise<Response> => {
    const { handleApiError } = await import("./errors");
    try {
      const session = await getSession(request);
      return handler(request, context, session);
    } catch (error) {
      return handleApiError(error, "withAuthOptional");
    }
  };
}
