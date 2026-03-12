import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as coursesService from "@/modules/courses/service";
import { updateCourseSchema } from "@/modules/courses/schema";

async function getHandler(
  _req: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    const result = await coursesService.getCourseDetail(id);
    return successResponse(result, "Course retrieved");
  } catch (e) {
    return handleApiError(e, "courses/[id] GET");
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
    const input = validateBody(updateCourseSchema, body);
    const result = await coursesService.updateCourse(id, input);
    return successResponse(result, "Course updated");
  } catch (e) {
    return handleApiError(e, "courses/[id] PATCH");
  }
}

async function deleteHandler(
  _req: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    await coursesService.archiveCourse(id);
    return successResponse(null, "Course archived");
  } catch (e) {
    return handleApiError(e, "courses/[id] DELETE");
  }
}

export const GET = withAuth(getHandler, "MANAGEMENT", "TEACHER", "STUDENT");
export const PATCH = withAuth(patchHandler, "MANAGEMENT");
export const DELETE = withAuth(deleteHandler, "MANAGEMENT");
