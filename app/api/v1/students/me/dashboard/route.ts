import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as studentsService from "@/modules/students/service";

async function handler(
  _req: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const data = await studentsService.getStudentDashboard(session.userId);
    return successResponse(data, "Dashboard retrieved");
  } catch (e) {
    return handleApiError(e, "students/dashboard");
  }
}

export const GET = withAuth(handler, "STUDENT");
