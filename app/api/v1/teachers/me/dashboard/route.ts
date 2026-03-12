import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as teachersService from "@/modules/teachers/service";

async function handler(
  _req: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const result = await teachersService.getTeacherDashboard(session.userId);
    return successResponse(result, "Dashboard retrieved");
  } catch (e) {
    return handleApiError(e, "teachers/me/dashboard");
  }
}

export const GET = withAuth(handler, "TEACHER");
