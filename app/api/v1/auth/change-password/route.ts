import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as authService from "@/modules/auth/service";
import { changePasswordSchema } from "@/modules/auth/schema";

async function handler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const body = await request.json();
    const input = validateBody(changePasswordSchema, body);
    await authService.changePassword(session.userId, input);
    return successResponse(null, "Password updated");
  } catch (e) {
    return handleApiError(e, "auth/change-password");
  }
}

export const POST = withAuth(handler, "STUDENT", "TEACHER", "MANAGEMENT");
