import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as scoresService from "@/modules/scores/service";
import * as studentsService from "@/modules/students/service";

async function handler(
  request: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  session: { userId: string; role: string }
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    await studentsService.ensureStudentAccess(session, id);
    const url = new URL(request.url);
    const filters = {
      semester: url.searchParams.get("semester") ?? undefined,
      assessmentType: url.searchParams.get("assessmentType") ?? undefined,
    };
    const result = await scoresService.getStudentScores(id, filters);
    return successResponse(result, "Scores retrieved");
  } catch (e) {
    return handleApiError(e, "students/[id]/scores");
  }
}

export const GET = withAuth(handler, "MANAGEMENT", "TEACHER", "STUDENT");
