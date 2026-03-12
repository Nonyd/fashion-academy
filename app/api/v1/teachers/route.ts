import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateQuery } from "@/lib/validators";
import { paginationSchema } from "@/lib/validators";
import { successResponse, paginatedResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as teachersService from "@/modules/teachers/service";
import * as usersService from "@/modules/users/service";
import { createUserSchema } from "@/modules/users/schema";

async function getHandler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const url = new URL(request.url);
    const pagination = validateQuery(paginationSchema, url.searchParams);
    const filters = { search: url.searchParams.get("search") ?? undefined };
    const { items, total } = await teachersService.listTeachers(filters, pagination);
    const totalPages = Math.ceil(total / pagination.limit);
    return paginatedResponse(items, {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages,
    });
  } catch (e) {
    return handleApiError(e, "teachers/list");
  }
}

async function postHandler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const body = await request.json();
    const input = validateBody(createUserSchema, body);
    const result = await usersService.createUser({ ...input, role: "TEACHER" });
    return successResponse(result, "Teacher created");
  } catch (e) {
    return handleApiError(e, "teachers/POST");
  }
}

export const GET = withAuth(getHandler, "MANAGEMENT");
export const POST = withAuth(postHandler, "MANAGEMENT");
