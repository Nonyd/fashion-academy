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
    const studentId = params?.studentId;
    if (!studentId) throw new Error("Missing studentId");
    await studentsService.ensureStudentAccess(session, studentId);
    const result = await scoresService.generateTranscript(studentId);
    return successResponse(result, "Transcript retrieved");
  } catch (e) {
    return handleApiError(e, "scores/transcript/[studentId]");
  }
}

export const GET = withAuth(handler, "MANAGEMENT", "STUDENT");
