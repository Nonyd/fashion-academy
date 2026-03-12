import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as courseQueries from "@/modules/courses/queries";

async function handler(
  _req: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const teacher = await import("@/lib/prisma").then((p) =>
      p.default.teacher.findUnique({ where: { userId: session.userId } })
    );
    if (!teacher) throw new Error("Teacher not found");
    const result = await courseQueries.getTeacherCourses(teacher.id);
    return successResponse(result, "Courses retrieved");
  } catch (e) {
    return handleApiError(e, "teachers/me/courses");
  }
}

export const GET = withAuth(handler, "TEACHER");
