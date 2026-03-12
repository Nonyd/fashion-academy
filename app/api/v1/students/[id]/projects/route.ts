import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as studentsService from "@/modules/students/service";
import * as projectQueries from "@/modules/projects/queries";

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
    const filters = Object.fromEntries(new URL(request.url).searchParams.entries());
    const result = await projectQueries.findProjectsByStudent(
      id,
      filters as Parameters<typeof projectQueries.findProjectsByStudent>[1]
    );
    return successResponse(result, "Projects retrieved");
  } catch (e) {
    return handleApiError(e, "students/[id]/projects");
  }
}

export const GET = withAuth(handler, "MANAGEMENT", "TEACHER", "STUDENT");
