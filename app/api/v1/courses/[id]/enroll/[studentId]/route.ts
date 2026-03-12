import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as coursesService from "@/modules/courses/service";

async function handler(
  _req: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const params = await context.params;
    const id = params?.id;
    const studentId = params?.studentId;
    if (!id || !studentId) throw new Error("Missing id or studentId");
    await coursesService.unenrollStudent(studentId, id);
    return successResponse(null, "Student unenrolled");
  } catch (e) {
    return handleApiError(e, "courses/[id]/enroll/[studentId]");
  }
}

export const DELETE = withAuth(handler, "MANAGEMENT");
