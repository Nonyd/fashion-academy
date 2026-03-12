import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as coursesService from "@/modules/courses/service";
import { enrollStudentSchema } from "@/modules/courses/schema";

async function handler(
  request: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing course id");
    const body = await request.json();
    const input = validateBody(enrollStudentSchema, body);
    await coursesService.enrollStudent(input.studentId, id);
    return successResponse(null, "Student enrolled");
  } catch (e) {
    return handleApiError(e, "courses/[id]/enroll");
  }
}

export const POST = withAuth(handler, "MANAGEMENT");
