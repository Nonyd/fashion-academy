import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody, validateQuery } from "@/lib/validators";
import { paginationSchema } from "@/lib/validators";
import { successResponse, paginatedResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as admissionsService from "@/modules/admissions/service";
import { createAdmissionSchema, admissionFiltersSchema } from "@/modules/admissions/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = validateBody(createAdmissionSchema, body);
    const result = await admissionsService.submitApplication(input);
    return successResponse(result, "Application submitted");
  } catch (e) {
    return handleApiError(e, "admissions/POST");
  }
}

async function getHandler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const url = new URL(request.url);
    const pagination = validateQuery(paginationSchema, url.searchParams);
    const filters = validateQuery(admissionFiltersSchema, url.searchParams);
    const { items, total } = await admissionsService.listAdmissions(filters, pagination);
    const totalPages = Math.ceil(total / pagination.limit);
    return paginatedResponse(items, {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages,
    });
  } catch (e) {
    return handleApiError(e, "admissions/list");
  }
}

export const GET = withAuth(getHandler, "MANAGEMENT");
