import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody, validateQuery } from "@/lib/validators";
import { paginationSchema } from "@/lib/validators";
import { successResponse, paginatedResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as coursesService from "@/modules/courses/service";
import { createCourseSchema } from "@/modules/courses/schema";

async function getHandler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const url = new URL(request.url);
    const pagination = validateQuery(paginationSchema, url.searchParams);
    const filters = Object.fromEntries(url.searchParams.entries());
    const { items, total } = await coursesService.listCourses(filters, pagination);
    const totalPages = Math.ceil(total / pagination.limit);
    return paginatedResponse(items, {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages,
    });
  } catch (e) {
    return handleApiError(e, "courses/list");
  }
}

async function postHandler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const body = await request.json();
    const input = validateBody(createCourseSchema, body);
    const result = await coursesService.createCourse(input);
    return successResponse(result, "Course created");
  } catch (e) {
    return handleApiError(e, "courses/POST");
  }
}

export const GET = withAuth(getHandler, "MANAGEMENT", "TEACHER", "STUDENT");
export const POST = withAuth(postHandler, "MANAGEMENT");
