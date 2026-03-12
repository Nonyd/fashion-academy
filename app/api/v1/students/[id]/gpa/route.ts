import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as scoresService from "@/modules/scores/service";
import * as studentsService from "@/modules/students/service";

async function handler(
  _req: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  session: { userId: string; role: string }
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    await studentsService.ensureStudentAccess(session, id);
    const gpa = await scoresService.getStudentGPA(id);
    return successResponse({ gpa }, "GPA retrieved");
  } catch (e) {
    return handleApiError(e, "students/[id]/gpa");
  }
}

export const GET = withAuth(handler, "MANAGEMENT", "TEACHER", "STUDENT");
