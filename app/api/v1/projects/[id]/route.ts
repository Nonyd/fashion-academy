import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as projectQueries from "@/modules/projects/queries";
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
    const project = await projectQueries.findProjectById(id);
    if (!project) throw new Error("Project not found");
    if (session.role === "STUDENT" && project.student.userId !== session.userId) {
      const { ForbiddenError } = await import("@/lib/errors");
      throw new ForbiddenError();
    }
    return successResponse(project, "Project retrieved");
  } catch (e) {
    return handleApiError(e, "projects/[id]");
  }
}

export const GET = withAuth(handler, "MANAGEMENT", "TEACHER", "STUDENT");
