import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as teachersService from "@/modules/teachers/service";
import * as usersService from "@/modules/users/service";
import { updateTeacherSchema } from "@/modules/teachers/schema";

async function getHandler(
  _req: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    const result = await teachersService.getTeacherProfile(id);
    return successResponse(result, "Teacher retrieved");
  } catch (e) {
    return handleApiError(e, "teachers/[id]");
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
    const teacher = await teachersService.getTeacherProfile(id);
    const body = await request.json();
    const input = validateBody(updateTeacherSchema, body);
    const result = await teachersService.updateTeacherProfile(teacher.userId, input);
    return successResponse(result, "Teacher updated");
  } catch (e) {
    return handleApiError(e, "teachers/[id] PATCH");
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
    const teacher = await teachersService.getTeacherProfile(id);
    await usersService.deactivateUser(teacher.userId);
    return successResponse(null, "Teacher deactivated");
  } catch (e) {
    return handleApiError(e, "teachers/[id] DELETE");
  }
}

export const GET = withAuth(getHandler, "MANAGEMENT");
export const PATCH = withAuth(patchHandler, "MANAGEMENT");
export const DELETE = withAuth(deleteHandler, "MANAGEMENT");
