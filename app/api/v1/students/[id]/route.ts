import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as studentsService from "@/modules/students/service";
import { updateStudentSchema } from "@/modules/students/schema";

async function getHandler(
  _req: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  session: { userId: string; role: string }
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    await studentsService.ensureStudentAccess(session, id);
    const student = await studentsService.getStudentFullRecord(id);
    return successResponse(student, "Student retrieved");
  } catch (e) {
    return handleApiError(e, "students/[id]");
  }
}

async function patchHandler(
  request: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    const body = await request.json();
    const input = validateBody(updateStudentSchema, body);
    const result = await studentsService.updateStudent(id, input);
    return successResponse(result, "Student updated");
  } catch (e) {
    return handleApiError(e, "students/[id] PATCH");
  }
}

export const GET = withAuth(getHandler, "MANAGEMENT", "TEACHER", "STUDENT");
export const PATCH = withAuth(patchHandler, "MANAGEMENT");
