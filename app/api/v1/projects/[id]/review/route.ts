import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as projectsService from "@/modules/projects/service";
import { reviewProjectSchema } from "@/modules/projects/schema";

async function handler(
  request: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    const teacher = await import("@/lib/prisma").then((p) =>
      p.default.teacher.findUnique({ where: { userId: session.userId } })
    );
    if (!teacher) throw new Error("Teacher not found");
    const body = await request.json();
    const input = validateBody(reviewProjectSchema, body);
    const result = await projectsService.reviewProject(id, input, teacher.id);
    return successResponse(result, "Project reviewed");
  } catch (e) {
    return handleApiError(e, "projects/[id]/review");
  }
}

export const PATCH = withAuth(handler, "TEACHER");
